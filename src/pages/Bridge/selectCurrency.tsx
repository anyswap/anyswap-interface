import { Currency, Pair, Token, ETHER } from '@uniswap/sdk'
import React, { KeyboardEvent, useState, useContext, RefObject, useCallback, useEffect, useRef, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { RowBetween } from '../../components/Row'
import Column from '../../components/Column'
import QuestionHelper from '../../components/QuestionHelper'
import { PaddedColumn, SearchInput, Separator } from '../../components/SearchModal/styleds'
import { useTokenComparator } from '../../components/SearchModal/sorting'
import { filterTokens } from '../../components/SearchModal/filtering'

import { Input as NumericalInput } from '../../components/NumericalInput'
import TokenLogo from '../../components/TokenLogo'
import Modal from '../../components/Modal'
import { TYPE, CloseIcon } from '../../theme'

import { useActiveWeb3React } from '../../hooks'
// import { useAllTokens, useToken } from '../../hooks/Tokens'
import { useToken } from '../../hooks/Tokens'
import { useTranslation } from 'react-i18next'
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


import { isAddress } from '../../utils'

import CurrencyList from './CurrencyList'


interface SelectCurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
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
  // const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // const allTokens = useAllTokens()
  const allTokens = config.bridgeTokenList
  // console.log(config)
  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)
  const searchToken = useToken(searchQuery)

  const tokenComparator = useTokenComparator(true)

  const inputRef = useRef<HTMLInputElement>()
  const fixedList = useRef<FixedSizeList>()

  const handleInput = useCallback(event => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    // fixedList.current?.scrollTo(0)
  }, [])

  const filteredTokens: Token[] = useMemo(() => {
    if (isAddressSearch) return searchToken ? [searchToken] : []
    return filterTokens(Object.values(allTokens), searchQuery)
  }, [isAddressSearch, searchToken, allTokens, searchQuery])

  const filteredSortedTokens: Token[] = useMemo(() => {
    if (searchToken) return [searchToken]
    // console.log(filteredTokens)
    // console.log(filteredTokens)
    const sorted = filteredTokens.sort(tokenComparator)
    // console.log(sorted)
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0)
    if (symbolMatch.length > 1) return sorted

    // console.log(symbolMatch)
    // console.log(searchQuery)

    return [
      ...(searchToken ? [searchToken] : []),
      // 首先对任何完全匹配的符号进行排序
      ...sorted.filter(token => token.symbol?.toLowerCase() === symbolMatch[0]),
      ...sorted.filter(token => token.symbol?.toLowerCase() !== symbolMatch[0])
    ]
  }, [searchQuery, searchToken, tokenComparator])
  // }, [filteredTokens, searchQuery, searchToken, tokenComparator])
  
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (onCurrencySelect) {
        onCurrencySelect(currency)
        handleDismissSearch()
      }
    },
    [onCurrencySelect]
  )
  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = searchQuery.toLowerCase().trim()
        if (s === 'eth') {
          handleCurrencySelect(ETHER)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === searchQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    // [searchQuery]
    [filteredSortedTokens, handleCurrencySelect, searchQuery]
  )

  const { account } = useActiveWeb3React()
  const formatCurrency = useToken(currency?.address)
  // const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, formatCurrency ?? undefined)
  const theme = useContext(ThemeContext)
    // console.log(currency)
  // const removeToken = useRemoveUserAddedToken()
  // const addToken = useAddUserToken()


  useEffect(() => {
    if (modalOpen) setSearchQuery('')
  }, [modalOpen])

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
        // <CurrencySearchModal
        //   isOpen={modalOpen}
        //   onDismiss={handleDismissSearch}
        //   onCurrencySelect={onCurrencySelect}
        //   selectedCurrency={currency}
        //   otherSelectedCurrency={otherCurrency}
        //   showCommonBases={showCommonBases}
        // />
        <Modal isOpen={modalOpen} onDismiss={handleDismissSearch} maxHeight={80} minHeight={80}>
          <Column style={{ width: '100%', flex: '1 1' }}>
            <PaddedColumn gap="14px">
              <RowBetween>
                <Text fontWeight={500} fontSize={16}>
                  {t('selectToken')}
                  <QuestionHelper text={t('tip6')} />
                </Text>
                <CloseIcon onClick={handleDismissSearch} />
              </RowBetween>
              <SearchInput
                type="text"
                id="token-search-input"
                placeholder={t('tokenSearchPlaceholder')}
                value={searchQuery}
                ref={inputRef as RefObject<HTMLInputElement>}
                onChange={handleInput}
                onKeyDown={handleEnter}
              />
              {/* <RowBetween>
                <Text fontSize={14} fontWeight={500}>
                  {t('TokenName')}
                </Text>
                <SortButton ascending={invertSearchOrder} toggleSortOrder={() => setInvertSearchOrder(iso => !iso)} />
              </RowBetween> */}
            </PaddedColumn>
            <Separator />
            <div style={{ flex: '1' }}>
              <AutoSizer disableWidth>
                {({ height }) => (
                  <CurrencyList
                    height={height}
                    showETH={true}
                    currencies={filteredSortedTokens}
                    onCurrencySelect={handleCurrencySelect}
                    otherCurrency={otherCurrency}
                    selectedCurrency={currency}
                    fixedListRef={fixedList}
                  />
                )}
              </AutoSizer>
            </div>
          </Column>
        </Modal>
      )}
    </InputPanel>
  )
}
