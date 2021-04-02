import React, {  useContext, useMemo } from 'react'
// import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from 'anyswap-sdk'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
// import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
// import { StyledInternalLink, ExternalLink, TYPE, HideSmall } from '../../theme'
import { StyledInternalLink, TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
// import { Dots } from '../../components/swap/styleds'
// import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'


import config from '../../config'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

// const VoteCard = styled(DataCard)`
//   background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
//   overflow: hidden;
// `

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoadingBox = styled.div`
color:#999;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  // const [tokenPairsWithLiquidityTokens, setTokenPairsWithLiquidityTokens] = useState<Array<TPWLT>>([])
  // const getGokenPairsWithLiquidityTokens = useCallback(() => {
  //   getPairsAddress(trackedTokenPairs).then((res: any) => {
  //     console.log(trackedTokenPairs)
  //     console.log(res)
  //     if (res && res.length > 0) {
  //       const arr = []
  //       for (const obj of res) {
  //         if (obj.pairAddress) {
  //           arr.push({
  //             liquidityToken: new Token(obj.chainId, obj.pairAddress, 18, 'UNI-V2', 'Uniswap V2'),
  //             tokens: obj.tokens
  //           })
  //         }
  //       }
  //       console.log(arr)
  //       setTokenPairsWithLiquidityTokens(arr)
  //     }
  //   })
  // }, [trackedTokenPairs])
  // useEffect(() => {
  //   getGokenPairsWithLiquidityTokens()
  // }, [getGokenPairsWithLiquidityTokens])
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )
  // console.log(tokenPairsWithLiquidityTokens)
  // console.log(trackedTokenPairs)

  // 获取用户有余额的所有V2池的保留
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )
  // console.log(tokenPairsWithLiquidityTokens)
  // console.log(v2PairsBalances)
  // console.log(liquidityTokensWithBalances)
  const tokenArr = useMemo(() => liquidityTokensWithBalances.map(({ tokens }) => tokens), [liquidityTokensWithBalances])
  // const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2Pairs = usePairs(tokenArr)
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />

        {/* <VoteCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>{t('LiquidityProviderPewards')}</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>{t('LiquidityProviderPewardsTip')}</TYPE.white>
              </RowBetween>
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                target="_blank"
                href="https://uniswap.org/docs/v2/core-concepts/pools/"
              >
                <TYPE.white fontSize={14}>{t('readMore')}</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </VoteCard> */}

        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>
                  {t('YourLiquidity')}
                </TYPE.mediumHeader>
              </HideSmall>
              <ButtonRow>
                <ResponsiveButtonSecondary as={Link} padding="6px 8px" to={"/create/" + config.symbol}>
                  {t('CreatePair')}
                </ResponsiveButtonSecondary>
                <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="6px 8px" to={"/add/" + config.symbol}>
                  <Text fontWeight={500} fontSize={16}>
                    {t('AddLiquidity')}
                  </Text>
                </ResponsiveButtonPrimary>
              </ButtonRow>
            </TitleRow>

            {!account ? (
              <Card padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('ConnectWalletViewLiquidity')}
                </TYPE.body>
              </Card>
            ) : v2IsLoading ? (
              <EmptyProposals>
                {/* <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body> */}
                <LoadingBox>{t('Loading')}</LoadingBox>
              </EmptyProposals>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {/* <ButtonSecondary>
                  <RowBetween>
                    <ExternalLink href={'https://uniswap.info/account/' + account}>
                      {t('AccountAnalytics')}
                    </ExternalLink>
                    <span> ↗</span>
                  </RowBetween>
                </ButtonSecondary> */}

                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('NoLiquidityFound')}
                </TYPE.body>
              </EmptyProposals>
            )}

            <AutoColumn justify={'center'} gap="md">
              <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                {/* {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                </StyledInternalLink> */}
                {t('DoNotSeeYouPool')}
                <StyledInternalLink id="import-pool-link" to={'/find'}>
                  {t('ImportIt')}
                </StyledInternalLink>
              </Text>
            </AutoColumn>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
