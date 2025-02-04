import { TransactionResponse } from '@ethersproject/abstract-provider'
import { AddressZero } from '@ethersproject/constants'
import { Currency, CurrencyAmount, Fraction, JSBI, Percent, Token, TokenAmount, WETH } from '@uniswap/sdk'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect, RouteComponentProps } from 'react-router'
import { Text } from 'rebass'
import { ButtonConfirmed } from '../../components/Button'
import { LightCard, PinkCard, YellowCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import TokenLogo from '../../components/TokenLogo'
import FormattedCurrencyAmount from '../../components/FormattedCurrencyAmount'
import QuestionHelper from '../../components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import { Dots } from '../../components/swap/styleds'
import { DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../../constants'
import { MIGRATOR_ADDRESS } from '../../constants/abis/migrator'
import { PairState, usePair } from '../../data/Reserves'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useToken } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useV1ExchangeContract, useV2MigratorContract } from '../../hooks/useContract'
import { NEVER_RELOAD, useSingleCallResult } from '../../state/multicall/hooks'
import { useIsTransactionPending, useTransactionAdder } from '../../state/transactions/hooks'
import { useETHBalances, useTokenBalance } from '../../state/wallet/hooks'
import { BackArrow, ExternalLink, TYPE } from '../../theme'
import { getEtherscanLink, isAddress } from '../../utils'
import { BodyWrapper } from '../AppBody'
// import { EmptyState } from './EmptyState'

import config from '../../config'

const WEI_DENOM = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
const ZERO = JSBI.BigInt(0)
const ONE = JSBI.BigInt(1)
const ZERO_FRACTION = new Fraction(ZERO, ONE)
const ALLOWED_OUTPUT_MIN_PERCENT = new Percent(JSBI.BigInt(10000 - INITIAL_ALLOWED_SLIPPAGE), JSBI.BigInt(10000))

export function V1LiquidityInfo({
  token,
  liquidityTokenAmount,
  tokenWorth,
  ethWorth
}: {
  token: Token
  liquidityTokenAmount: TokenAmount
  tokenWorth: TokenAmount
  ethWorth: CurrencyAmount
}) {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  return (
    <>
      <AutoRow style={{ justifyContent: 'flex-start', width: 'fit-content' }}>
        <TokenLogo symbol={config.getBaseCoin(token.symbol)} size="24px"></TokenLogo>
        <div style={{ marginLeft: '.75rem' }}>
          <TYPE.mediumHeader>
            {<FormattedCurrencyAmount currencyAmount={liquidityTokenAmount} />}{' '}
            {chainId && token.equals(WETH[chainId]) ? ('W' + config.symbol) : config.getBaseCoin(token.symbol)}/{config.symbol}
          </TYPE.mediumHeader>
        </div>
      </AutoRow>

      <RowBetween my="1rem">
        <Text fontSize={16} fontWeight={500}>
          {t('Pooled')} {chainId && token.equals(WETH[chainId]) ? ('W' + config.symbol) : config.getBaseCoin(token.symbol)}:
        </Text>
        <RowFixed>
          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
            {tokenWorth.toSignificant(4)}
          </Text>
          <TokenLogo symbol={config.getBaseCoin(token.symbol)} size="20px" style={{ marginLeft: '8px' }}></TokenLogo>
        </RowFixed>
      </RowBetween>
      <RowBetween mb="1rem">
        <Text fontSize={16} fontWeight={500}>
          {t('Pooled')} {config.symbol}:
        </Text>
        <RowFixed>
          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
            <FormattedCurrencyAmount currencyAmount={ethWorth} />
          </Text>
          <TokenLogo symbol={config.getBaseCoin(Currency.ETHER.symbol)} size="20px" style={{ marginLeft: '8px' }}></TokenLogo>
        </RowFixed>
      </RowBetween>
    </>
  )
}

function V1PairMigration({ liquidityTokenAmount, token }: { liquidityTokenAmount: TokenAmount; token: Token }) {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const totalSupply = useTotalSupply(liquidityTokenAmount.token)
  const exchangeETHBalance = useETHBalances([liquidityTokenAmount.token.address])?.[liquidityTokenAmount.token.address]
  const exchangeTokenBalance = useTokenBalance(liquidityTokenAmount.token.address, token)

  const [v2PairState, v2Pair] = usePair(chainId ? WETH[chainId] : undefined, token)
  const isFirstLiquidityProvider: boolean = v2PairState === PairState.NOT_EXISTS

  const v2SpotPrice = chainId && v2Pair ? v2Pair.reserveOf(token).divide(v2Pair.reserveOf(WETH[chainId])) : undefined

  const [confirmingMigration, setConfirmingMigration] = useState<boolean>(false)
  const [pendingMigrationHash, setPendingMigrationHash] = useState<string | null>(null)

  const shareFraction: Fraction = totalSupply ? new Percent(liquidityTokenAmount.raw, totalSupply.raw) : ZERO_FRACTION

  const ethWorth: CurrencyAmount = exchangeETHBalance
    ? CurrencyAmount.ether(exchangeETHBalance.multiply(shareFraction).multiply(WEI_DENOM).quotient)
    : CurrencyAmount.ether(ZERO)

  const tokenWorth: TokenAmount = exchangeTokenBalance
    ? new TokenAmount(token, shareFraction.multiply(exchangeTokenBalance.raw).quotient)
    : new TokenAmount(token, ZERO)

  const [approval, approve] = useApproveCallback(liquidityTokenAmount, MIGRATOR_ADDRESS)

  const v1SpotPrice =
    exchangeTokenBalance && exchangeETHBalance
      ? exchangeTokenBalance.divide(new Fraction(exchangeETHBalance.raw, WEI_DENOM))
      : null

  const priceDifferenceFraction: Fraction | undefined =
    v1SpotPrice && v2SpotPrice
      ? v1SpotPrice
          .divide(v2SpotPrice)
          .multiply('100')
          .subtract('100')
      : undefined

  const priceDifferenceAbs: Fraction | undefined = priceDifferenceFraction?.lessThan(ZERO)
    ? priceDifferenceFraction?.multiply('-1')
    : priceDifferenceFraction

  const minAmountETH: JSBI | undefined =
    v2SpotPrice && tokenWorth
      ? tokenWorth
          .divide(v2SpotPrice)
          .multiply(WEI_DENOM)
          .multiply(ALLOWED_OUTPUT_MIN_PERCENT).quotient
      : ethWorth?.numerator

  const minAmountToken: JSBI | undefined =
    v2SpotPrice && ethWorth
      ? ethWorth
          .multiply(v2SpotPrice)
          .multiply(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token.decimals)))
          .multiply(ALLOWED_OUTPUT_MIN_PERCENT).quotient
      : tokenWorth?.numerator

  const addTransaction = useTransactionAdder()
  const isMigrationPending = useIsTransactionPending(pendingMigrationHash ?? undefined)

  const migrator = useV2MigratorContract()
  const migrate = useCallback(() => {
    if (!minAmountToken || !minAmountETH || !migrator) return

    setConfirmingMigration(true)
    migrator
      .migrate(
        token.address,
        minAmountToken.toString(),
        minAmountETH.toString(),
        account,
        Math.floor(new Date().getTime() / 1000) + DEFAULT_DEADLINE_FROM_NOW
      )
      .then((response: TransactionResponse) => {
        // ReactGA.event({
        //   category: 'Migrate',
        //   action: 'V1->V2',
        //   label: token?.symbol
        // })

        addTransaction(response, {
          summary: `Migrate ${config.getBaseCoin(token.symbol)} liquidity to V2`
        })
        setPendingMigrationHash(response.hash)
      })
      .catch(() => {
        setConfirmingMigration(false)
      })
  }, [minAmountToken, minAmountETH, migrator, token, account, addTransaction])

  const noLiquidityTokens = !!liquidityTokenAmount && liquidityTokenAmount.equalTo(ZERO)

  const largePriceDifference = !!priceDifferenceAbs && !priceDifferenceAbs.lessThan(JSBI.BigInt(5))

  const isSuccessfullyMigrated = !!pendingMigrationHash && noLiquidityTokens

  return (
    <AutoColumn gap="20px">
      <TYPE.body my={9} style={{ fontWeight: 400 }}>
        {t('tip23')}{' '}
        {chainId && (
          <ExternalLink href={getEtherscanLink(chainId, MIGRATOR_ADDRESS, 'address')}>
            <TYPE.blue display="inline">{config.name} {t('migrationContract')}↗</TYPE.blue>
          </ExternalLink>
        )}
        .
      </TYPE.body>

      {!isFirstLiquidityProvider && largePriceDifference ? (
        <YellowCard>
          <TYPE.body style={{ marginBottom: 8, fontWeight: 400 }}>
            {t('tip24', {appName: config.appName})}
          </TYPE.body>
          <AutoColumn gap="8px">
            <RowBetween>
              <TYPE.body>V1 {t('Price')}:</TYPE.body>
              <TYPE.black>
                {v1SpotPrice?.toSignificant(6)} {config.getBaseCoin(token.symbol)}/{config.symbol}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {v1SpotPrice?.invert()?.toSignificant(6)} {config.symbol}/{config.getBaseCoin(token.symbol)}
              </TYPE.black>
            </RowBetween>

            <RowBetween>
              <TYPE.body>V2 {t('Price')}:</TYPE.body>
              <TYPE.black>
                {v2SpotPrice?.toSignificant(6)} {config.getBaseCoin(token.symbol)}/{config.symbol}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {v2SpotPrice?.invert()?.toSignificant(6)} {config.symbol}/{config.getBaseCoin(token.symbol)}
              </TYPE.black>
            </RowBetween>

            <RowBetween>
              <TYPE.body color="inherit">{t('PriceDifference')}:</TYPE.body>
              <TYPE.black color="inherit">{priceDifferenceAbs?.toSignificant(4)}%</TYPE.black>
            </RowBetween>
          </AutoColumn>
        </YellowCard>
      ) : null}

      {isFirstLiquidityProvider && (
        <PinkCard>
          <TYPE.body style={{ marginBottom: 8, fontWeight: 400 }}>
          {t('tip25', {appName: config.appName})}
          </TYPE.body>

          <AutoColumn gap="8px">
            <RowBetween>
              <TYPE.body>V1 {t('Price')}:</TYPE.body>
              <TYPE.black>
                {v1SpotPrice?.toSignificant(6)} {config.getBaseCoin(token.symbol)}/{config.symbol}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {v1SpotPrice?.invert()?.toSignificant(6)} {config.symbol}/{config.getBaseCoin(token.symbol)}
              </TYPE.black>
            </RowBetween>
          </AutoColumn>
        </PinkCard>
      )}

      <LightCard>
        <V1LiquidityInfo
          token={token}
          liquidityTokenAmount={liquidityTokenAmount}
          tokenWorth={tokenWorth}
          ethWorth={ethWorth}
        />

        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <AutoColumn gap="12px" style={{ flex: '1', marginRight: 12 }}>
            <ButtonConfirmed
              confirmed={approval === ApprovalState.APPROVED}
              disabled={approval !== ApprovalState.NOT_APPROVED}
              onClick={approve}
            >
              {approval === ApprovalState.PENDING ? (
                <Dots>{t('Approving')}</Dots>
              ) : approval === ApprovalState.APPROVED ? (
                t('Approved')
              ) : (
                t('Approve')
              )}
            </ButtonConfirmed>
          </AutoColumn>
          <AutoColumn gap="12px" style={{ flex: '1' }}>
            <ButtonConfirmed
              confirmed={isSuccessfullyMigrated}
              disabled={
                isSuccessfullyMigrated ||
                noLiquidityTokens ||
                isMigrationPending ||
                approval !== ApprovalState.APPROVED ||
                confirmingMigration
              }
              onClick={migrate}
            >
              {isSuccessfullyMigrated ? 'Success' : isMigrationPending ? <Dots>{t('Migrating')}</Dots> : t('Migrate')}
            </ButtonConfirmed>
          </AutoColumn>
        </div>
      </LightCard>
      <TYPE.darkGray style={{ textAlign: 'center' }}>
        {t('tip28', {
          oldApp: config.oldAppName + ' ' + config.getBaseCoin(token.symbol) + '/' + config.symbol,
          nowApp: config.appName + ' ' + config.getBaseCoin(token.symbol) + '/' + config.symbol
        })}
      </TYPE.darkGray>
    </AutoColumn>
  )
}

export default function MigrateV1Exchange({
  history,
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const validatedAddress = isAddress(address)
  const { chainId, account } = useActiveWeb3React()
  const { t } = useTranslation()

  const exchangeContract = useV1ExchangeContract(validatedAddress ? validatedAddress : undefined)
  const tokenAddress = useSingleCallResult(exchangeContract, 'tokenAddress', undefined, NEVER_RELOAD)?.result?.[0]

  const token = useToken(tokenAddress)

  const liquidityToken: Token | undefined = useMemo(
    () =>
      validatedAddress && chainId && token
        ? new Token(chainId, validatedAddress, 18, `${config.baseCurrency}-V1-${config.getBaseCoin(token.symbol)}`, config.oldAppName)
        : undefined,
    [chainId, validatedAddress, token]
  )
  const userLiquidityBalance = useTokenBalance(account ?? undefined, liquidityToken)

  // redirect for invalid url params
  if (!validatedAddress || tokenAddress === AddressZero) {
    console.error('Invalid address in path', address)
    return <Redirect to="/migrate/v1" />
  }

  return (
    <BodyWrapper style={{ padding: 24 }}>
      <AutoColumn gap="16px">
        <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
          <BackArrow to="/migrate/v1" />
          <TYPE.mediumHeader>{t('MigrateV1Liquidity')}</TYPE.mediumHeader>
          <div>
            <QuestionHelper text={t('tip27', {oldAppName: config.oldAppName, appName: config.appName})} />
          </div>
        </AutoRow>

        {!account ? (
          <TYPE.largeHeader>{t('tip26')}</TYPE.largeHeader>
        ) : validatedAddress && chainId && token?.equals(WETH[chainId]) ? (
          <>
            <TYPE.body my={9} style={{ fontWeight: 400 }}>
              {t('tip29', {
                appName: config.appName,
                symbol: 'W' + config.symbol,
                symbol1: config.symbol,
                oldAppName: config.oldAppName
              })}
            </TYPE.body>

            <ButtonConfirmed
              onClick={() => {
                history.push(`/remove/v1/${validatedAddress}`)
              }}
            >
              {t('Remove')}
            </ButtonConfirmed>
          </>
        ) : userLiquidityBalance && token ? (
          <V1PairMigration liquidityTokenAmount={userLiquidityBalance} token={token} />
        ) : (
          // <EmptyState message="Loading..." />
          t('Loading')
        )}
      </AutoColumn>
    </BodyWrapper>
  )
}
