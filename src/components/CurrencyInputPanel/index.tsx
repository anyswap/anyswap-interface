import { Currency, Pair } from '@uniswap/sdk'
import React, { useState, useContext, useCallback } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'
import { transparentize } from 'polished'
const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  // align-items: center;
  // height: 2.2rem;
  // font-size: 20px;
  // font-weight: 500;
  // background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
  // color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  // border-radius: 12px;
  // box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  // outline: none;
  // cursor: pointer;
  // user-select: none;
  // border: none;
  // padding: 0 0.5rem;

  // :focus,
  // :hover {
  //   background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  // }

  align-items: center;
  color: ${({ selected, theme }) => (selected ? theme.textColor : '#031a6e')};
  font-size: ${({ selected, theme }) => (selected ? '1rem' : '12px')};
  height: 70px;
  font-family: 'Manrope';
  width: 220px;
  border: 0.0625rem solid ${({ theme }) => theme.selectedBorder};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.selectedBg};
  outline: none;
  cursor: pointer;
  user-select: none;
  padding: 0 1.25rem;
  position: relative;

  :hover {
    border: 0.0625rem solid ${({ theme }) => theme.selectedHoverBorder};
    background: ${({ theme }) => theme.selectedHoverBg};
  }

  :focus {
    border: 0.0625rem solid ${({ theme }) => darken(0.1, theme.selectedBorder)};
  }

  :active {
    background-color: ${({ theme }) => darken(0.1, theme.selectedBorder)};
  }
  @media screen and (max-width: 960px) {
    width: 50%;
    padding: 0 0.625rem;
  }
`

const ErrorSpanBox = styled.div`
  height: 70px;
  width: 220px;
  margin-left: 0.625rem;
  @media screen and (max-width: 960px) {
    display:none;
  }
`
const ErrorSpan = styled.span`
  display:flex;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  height: 100%;
  color: ${({ theme }) => theme.textColor};
  border: 0.0625rem solid ${({theme}) => theme.selectedBorderNo};
  background-color: ${({theme}) => theme.selectedBgNo};
  border-radius: 0.75rem;
  outline: none;
  cursor: pointer;
  user-select: none;

  :hover {
    cursor: pointer;
    border: 0.0625rem solid ${({theme}) => theme.selectedHoverBorderNo};
    background-color: ${({theme}) => theme.selectedHoverBgNo};
  }
`

const ExtraText = styled.div`
  width: 100%;
  font-family: 'Manrope';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  position:relative;
  color: ${({theme}) => theme.textColorBold};
  h5 {
    font-weight: normal;
    line-height: 1;
    font-size: 0.75rem;
    margin: 0.25rem 0;
  }
  p  {
    font-size: 0.875rem;
    line-height: 1.43;
    margin:0;
    font-weight: 800;
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0px 1.625rem 0 51px;
  width:100%;
  height:100%;
  &.pl-0{
    padding-left:0;
  }
`

const TokenLogoBox = styled.div`
  ${({ theme }) => theme.flexC};
  width: 46px;
  height: 46px;
  background: ${ ({theme}) => theme.white};
  box-sizing:border-box;
  border-radius: 100%;
  margin-right: 1.25rem;
  position:absolute;
  top:0.625rem;
  left:0;
`

const StyledDropDownBox = styled.div`
  ${({ theme }) => theme.flexC}
  width: 1.625rem;
  height: 1.625rem;
  background: ${({ theme }) => theme.arrowBg};
  border-radius: 100%;
  position: absolute;
  top: 1.25rem;
  right: 0px;
`
const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  // border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  // border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.contentBg};
  box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
  border-radius: 0.5625rem;
  border: 1px solid rgb (255, 92, 177);
  padding: 1.25rem 2.5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 1.5625rem;
  `}
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  // ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  // font-size:  ${({ active }) => (active ? '20px' : '16px')};

  text-align:left;
  width: 100%;
  h3 {
    font-family: 'Manrope';
    font-size: 1rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${({theme}) => theme.selectTextColor};
    margin:0 0 2px;
  }
  p {
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${({theme}) => theme.selectTextColor};
    margin:0;
  }

`

// const StyledBalanceMax = styled.button`
//   height: 28px;
//   background-color: ${({ theme }) => theme.primary5};
//   border: 1px solid ${({ theme }) => theme.primary5};
//   border-radius: 0.5rem;
//   font-size: 0.875rem;

//   font-weight: 500;
//   cursor: pointer;
//   margin-right: 0.5rem;
//   color: ${({ theme }) => theme.primaryText1};
//   :hover {
//     border: 1px solid ${({ theme }) => theme.primary1};
//   }
//   :focus {
//     border: 1px solid ${({ theme }) => theme.primary1};
//     outline: none;
//   }

//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     margin-right: 0.5rem;
//   `};
// `

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

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {/* {account && (
                <TYPE.body
                  onClick={onMax}
                  color={theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? (customBalanceText ?? 'Balance: ') + selectedCurrencyBalance?.toSignificant(6)
                    : ' -'}
                </TYPE.body>
              )} */}
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
                style={{marginRight: '1.875rem'}}
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
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={35} margin={true} />
              ) : currency ? (
                <TokenLogoBox><CurrencyLogo currency={currency} size={'1.625rem'} /></TokenLogoBox>
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  <h3>{pair?.token0.symbol}:{pair?.token1.symbol}</h3>
                </StyledTokenName>
              ) : (
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  <h3>
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? currency.symbol.slice(0, 4) +
                        '...' +
                        currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                      : currency?.symbol) || t('selectToken')}
                  </h3>
                  <p>{currency && currency.name ? currency.name : ''}</p>
                </StyledTokenName>
              )}
              {!disableCurrencySelect && !!currency && <StyledDropDownBox><StyledDropDown selected={!!currency} /></StyledDropDownBox>}
            </Aligner>
          </CurrencySelect>
          <ErrorSpanBox>
            {
              !hideBalance && !!currency && selectedCurrencyBalance ? (
                <ErrorSpan onClick={onMax}>
                  <ExtraText>
                    <h5>{t('balance')}</h5>
                    <p>{!hideBalance && !!currency && selectedCurrencyBalance
                        ? (customBalanceText ?? '') + selectedCurrencyBalance?.toSignificant(6)
                        : ' -'} </p>
                  </ExtraText>
                </ErrorSpan>
              ) : ''
            }
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
