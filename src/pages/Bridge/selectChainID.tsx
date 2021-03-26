import React, { useState, useContext, useCallback, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
// import AutoSizer from 'react-virtualized-auto-sizer'
// import { FixedSizeList } from 'react-window'
import { RowBetween } from '../../components/Row'
import Column from '../../components/Column'
import QuestionHelper from '../../components/QuestionHelper'
import { PaddedColumn, Separator } from '../../components/SearchModal/styleds'

import { Input as NumericalInput } from '../../components/NumericalInput'
import TokenLogo from '../../components/TokenLogo'
import Modal from '../../components/Modal'
import { MenuItem } from '../../components/SearchModal/styleds'
import { TYPE, CloseIcon } from '../../theme'

import { useTranslation } from 'react-i18next'
import config from '../../config'

import {
  InputRow,
  CurrencySelect,
  ErrorSpanBox,
  // ErrorSpan,
  // ExtraText,
  LabelRow,
  Aligner,
  TokenLogoBox,
  StyledDropDownBox,
  StyledDropDown,
  InputPanel,
  Container,
  StyledTokenName,
  // HideSmallBox
} from '../../components/CurrencyInputPanel/styleds'


// import { isAddress } from '../../utils'

// import CurrencyList from './CurrencyList'

import {getAllChainIDs} from '../../utils/bridge/getBaseInfo'


interface SelectChainIdInputPanel {
  value: string
  onUserInput: (value: string) => void
  label?: string
  onChainSelect?: (selectChainId: any) => void
  selectChainId?: any
  disableCurrencySelect?: boolean
  hideInput?: boolean
  id: string
}

export default function SelectChainIdInputPanel({
  value,
  onUserInput,
  label = 'Input',
  onChainSelect,
  selectChainId,
  disableCurrencySelect = false,
  hideInput = false,
  id
}: SelectChainIdInputPanel) {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const [chainList, setChainList] = useState<Array<any>>([])

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const theme = useContext(ThemeContext)

  useEffect(() => {
    getAllChainIDs().then((res:any) => {
      console.log(res)
      setChainList(res)
    })
  }, [])

  const handleCurrencySelect = useCallback(
    (chainID) => {
      if (onChainSelect) {
        onChainSelect(chainID)
        handleDismissSearch()
      }
    },
    [onChainSelect]
  )

  function chainListView () {
    return (
      <>
        {
          chainList.map((item:string|number, index) => {
            return (
              <MenuItem
                className={`token-item-${index}`}
                onClick={() => (selectChainId && selectChainId === item ? null : handleCurrencySelect(item))}
                disabled={selectChainId === item}
                selected={selectChainId === item}
                key={index}
              >
                <TokenLogo symbol={config.chainInfo[item].symbol} size={'24px'}></TokenLogo>
                <Column>
                  <Text title={config.chainInfo[item].name} fontWeight={500}>
                    {config.getBaseCoin(config.chainInfo[item].symbol)}
                    {selectChainId === item}
                  </Text>
                </Column>
              </MenuItem>
            )
          })
        }
      </>
    )
  }

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
              {/* ) : ''} */}
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
                disabled
              />
            </>
          )}
          <CurrencySelect
            selected={!!selectChainId}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              <TokenLogoBox>
                <TokenLogo symbol={selectChainId ? config.chainInfo[selectChainId].symbol : ''} size={'24px'} />
              </TokenLogoBox>
              <StyledTokenName className="token-symbol-container" active={Boolean(selectChainId)}>
                {selectChainId && config.chainInfo[selectChainId].symbol ? config.chainInfo[selectChainId].symbol : t('selectToken')}
              </StyledTokenName>
              {!disableCurrencySelect && !!selectChainId && (
                <StyledDropDownBox>
                  <StyledDropDown selected={!!selectChainId} />
                </StyledDropDownBox>
              )}
            </Aligner>
          </CurrencySelect>
          <ErrorSpanBox>
            {/* {!hideBalance && !!currency && selectedCurrencyBalance ? (
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
            )} */}
          </ErrorSpanBox>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onChainSelect && (
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
            </PaddedColumn>
            <Separator />
            <div style={{ flex: '1' }}>
              {chainListView()}
            </div>
          </Column>
        </Modal>
      )}
    </InputPanel>
  )
}
