import { Currency, Pair } from '@uniswap/sdk'
import React, { useState, useContext, useCallback} from 'react'
import { ThemeContext } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { RowBetween } from '../../components/Row'
import { Input as NumericalInput } from '../../components/NumericalInput'
import TokenLogo from '../../components/TokenLogo'
import { TYPE } from '../../theme'

import { useActiveWeb3React } from '../../hooks'
import { useToken } from '../../hooks/Tokens'
import config from '../../config'

import {
  InputRow,
  CurrencySelect,
  ErrorSpanBox,
  ErrorSpan,
  ExtraText,
  LabelRow,
  Aligner,
  TokenLogoBox,
  StyledDropDownBox,
  StyledDropDown,
  InputPanel,
  Container,
  StyledTokenName,
  HideSmallBox
} from '../../components/CurrencyInputPanel/styleds'

import SearchModal from './searchModal'

interface SelectCurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax: (value: any) => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  // currency?: Currency | null
  currency?: any
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
}

export default function SelectCurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  // showCommonBases,
  customBalanceText
}: SelectCurrencyInputPanelProps) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const [modalOpen, setModalOpen] = useState(false)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const formatCurrency = useToken(currency?.address)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, formatCurrency ?? undefined)

  const handleMax = useCallback(() => {
    // console.log(selectedCurrencyBalance?.toSignificant(6))
    if (selectedCurrencyBalance) {
      onMax(selectedCurrencyBalance?.toSignificant(6))
    } else {
      onMax('')
    }
  }, [selectedCurrencyBalance, onMax])

  
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {account && showMaxButton ? (
                <HideSmallBox>

                  <TYPE.body
                    onClick={handleMax}
                    color={theme.text2}
                    fontWeight={500}
                    fontSize={14}
                    style={{ display: 'inline', cursor: 'pointer' }}
                  >
                    {!hideBalance && !!currency && selectedCurrencyBalance
                      ? (customBalanceText ?? (t('balanceTxt') + ': ')) + selectedCurrencyBalance?.toSignificant(6)
                      : ' -'}
                  </TYPE.body>
                </HideSmallBox>
              ) : ''}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
                style={{ marginRight: '1.875rem' }}
              />
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              <TokenLogoBox>
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={20} margin={true} />
                ) : currency ? (
                  <TokenLogo symbol={currency.symbol} size={'24px'} />
                ) : null}
              </TokenLogoBox>
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {config.getBaseCoin(pair?.token0.symbol)}:{config.getBaseCoin(pair?.token1.symbol)}
                </StyledTokenName>
              ) : (
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) +
                      '...' +
                      currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : config.getBaseCoin(currency?.symbol)) || t('selectToken')}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && !!currency && (
                <StyledDropDownBox>
                  <StyledDropDown selected={!!currency} />
                </StyledDropDownBox>
              )}
            </Aligner>
          </CurrencySelect>
          <ErrorSpanBox>
            {!hideBalance && !!currency && selectedCurrencyBalance ? (
              <ErrorSpan onClick={handleMax}>
                <ExtraText>
                  <h5>{t('balance')}</h5>
                  <p>
                    {!hideBalance && !!currency && selectedCurrencyBalance
                      ? (customBalanceText ?? '') + selectedCurrencyBalance?.toSignificant(6)
                      : ' -'}{' '}
                  </p>
                </ExtraText>
              </ErrorSpan>
            ) : (
              ''
            )}
          </ErrorSpanBox>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && modalOpen && (
        <SearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
        />
      )}
    </InputPanel>
  )
}
