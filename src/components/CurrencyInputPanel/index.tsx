import { Currency, Pair } from 'anyswap-sdk'
import React, { useState, useContext, useCallback } from 'react'
// import styled, { ThemeContext } from 'styled-components'
import { ThemeContext } from 'styled-components'
// import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
// import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'
// import { transparentize } from 'polished'

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
} from './styleds'

import config from '../../config'

import TokenLogo from '../TokenLogo'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
}

export default function CurrencyInputPanel({
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
  showCommonBases,
  customBalanceText
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const theme = useContext(ThemeContext)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  // console.log(selectedCurrencyBalance)
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
                    onClick={onMax}
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
              {/* {account && currency && showMaxButton && label !== 'To' && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )} */}
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
              <ErrorSpan onClick={onMax}>
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
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
