// import React, { useEffect, useMemo, useState } from 'react'
import React, { useEffect, useState, useContext } from 'react'
// import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
// import { useAllTokenBalances } from '../../state/wallet/hooks'
import { ArrowDown } from 'react-feather'
// import TokenLogo from '../../components/TokenLogo'
import AppBody from '../AppBody'
import { ThemeContext } from 'styled-components'
// import config from '../../config'
import SelectCurrencyInputPanel from './selectCurrency'
import SelectChainIdInputPanel from './selectChainID'


import useBridgeCallback from '../../hooks/useBridgeCallback'
import { WrapType } from '../../hooks/useWrapCallback'
// import { useDerivedSwapInfo } from '../../state/swap/hooks'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'

import Title from '../../components/Title'
import { AutoColumn } from '../../components/Column'
// import SwapIcon from '../../components/SwapIcon'
// import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button'
import { ButtonLight, ButtonPrimary, ButtonConfirmed } from '../../components/Button'
import { AutoRow } from '../../components/Row'
import Loader from '../../components/Loader'
import AddressInputPanel from '../../components/AddressInputPanel'
import { ArrowWrapper, BottomGrouping } from '../../components/swap/styleds'

import { useWalletModalToggle } from '../../state/application/hooks'
import { useSelectedTokenList } from '../../state/lists/hooks'
import config from '../../config'

// import {test} from '../../utils/tools/getPairAddress'
// import {getBaseInfo} from '../../utils/bridge/getBaseInfo'
import {getAllowance} from '../../utils/bridge/approval'

// const 
export default function Bridge() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  // const balances = useAllTokenBalances()
  const selectedTokenList = useSelectedTokenList()
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle()

  const [inputBridgeValue, setInputBridgeValue] = useState('')
  const [bridgeTypeName, setBridgeTypeName] = useState(t('bridgeAssets'))
  const [selectCurrency, setSelectCurrency] = useState<any>()
  const [selectChain, setSelectChain] = useState<any>()
  // const [approval, setApproval] = useState<any>()
  const [approvaling, setApprovaling] = useState<any>()
  const [recipient, setRecipient] = useState<any>('0xE000E632124aa65B80f74E3e4cc06DC761610583')

  const [approval, approveCallback] = useApproveCallback(undefined, selectCurrency?.address)

  // const { currencies } = useDerivedSwapInfo()

  const { wrapType, execute: onWrap, inputError: wrapInputError } = useBridgeCallback(
    selectCurrency,
    selectCurrency?.address,
    recipient,
    inputBridgeValue,
    selectChain
  )

  useEffect(() => {
    if (selectedTokenList && chainId && !selectCurrency) {
      // const useTokenList = selectedTokenList[chainId]
      const useTokenList = config.bridgeTokenList
      // console.log(useTokenList)
      for (const obj of useTokenList) {
        if (obj.address.toLowerCase() === config.bridgeInitToken) {
          setSelectCurrency(obj)
          break
        }
      }
    }
  }, [selectedTokenList, chainId, selectCurrency])

  useEffect(() => {
    if (chainId && !selectChain) {
      setSelectChain(config.initChain)
    }
  }, [chainId, selectChain])



  useEffect(() => {
    // getBaseInfo()
    console.log(ApprovalState)
    if (account && selectCurrency && selectCurrency.isUnderlying) {
      console.log(selectCurrency)
      getAllowance(account, selectCurrency?.address).then((res:any) => {
        console.log(res)
        setApprovaling('')
        // setApproval(res)
      })
    }
    // test()
  }, [selectCurrency, account])

  // function approveCallback () {
  //   setApprovaling(true)
  // }
  return (
    <>
      <AppBody>
        <Title
          title={t('bridgeAssets')}
          tabList={[
            {
              name: t('bridgeAssets'),
              onTabClick: name => {
                setBridgeTypeName(name)
              },
              iconUrl: require('../../assets/images/icon/deposit.svg'),
              iconActiveUrl: require('../../assets/images/icon/deposit-purple.svg')
            },
            {
              name: t('bridgeTxns'),
              onTabClick: name => {
                setBridgeTypeName(name)
              },
              iconUrl: require('../../assets/images/icon/withdraw.svg'),
              iconActiveUrl: require('../../assets/images/icon/withdraw-purple.svg')
            }
          ]}
        ></Title>
        <AutoColumn gap={'md'}>

          <SelectCurrencyInputPanel
            value={inputBridgeValue}
            onUserInput={(value) => {
              setInputBridgeValue(value)
            }}
            onCurrencySelect={(inputCurrency) => {
              setSelectCurrency(inputCurrency)
            }}
            currency={selectCurrency}
            disableCurrencySelect={false}
            showMaxButton={true}
            id="selectCurrency"
          ></SelectCurrencyInputPanel>

          <AutoRow justify="center" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable={false}>
              <ArrowDown size="16" color={theme.text2} />
            </ArrowWrapper>
          </AutoRow>

          <SelectChainIdInputPanel
            value={inputBridgeValue}
            onUserInput={(value) => {
              setInputBridgeValue(value)
            }}
            onChainSelect={(chainID) => {
              setSelectChain(chainID)
            }}
            selectChainId={selectChain}
            id="selectChainID"
          ></SelectChainIdInputPanel>

          <AutoRow justify="center" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable={false}>
              <ArrowDown size="16" color={theme.text2} />
            </ArrowWrapper>
          </AutoRow>
          <AddressInputPanel id="recipient" value={recipient} onChange={setRecipient} />
        </AutoColumn>

        <BottomGrouping>
          {!account ? (
              <ButtonLight onClick={toggleWalletModal}>{t('ConnectWallet')}</ButtonLight>
            ) : (
              (!approval || !Number(approval)) && selectCurrency && selectCurrency.isUnderlying ? (
                <ButtonConfirmed
                  onClick={approveCallback}
                  disabled={!!approval && !!Number(approval)}
                  width="48%"
                  altDisabledStyle={approvaling} // show solid button while waiting
                  confirmed={approvaling}
                >
                  {approvaling ? (
                    <AutoRow gap="6px" justify="center">
                      {t('Approving')} <Loader stroke="white" />
                    </AutoRow>
                  ) : approval && Number(approval) ? (
                    t('Approved')
                  ) : (
                    t('Approve')
                  )}
                </ButtonConfirmed>
              ) : (
                <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? bridgeTypeName : wrapType === WrapType.UNWRAP ? bridgeTypeName : bridgeTypeName)}123
                    {/* (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)} */}
                </ButtonPrimary>
              )
            )
          }
        </BottomGrouping>
      </AppBody>
    </>
  )
}