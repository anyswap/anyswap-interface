// import React, { useEffect, useMemo, useState } from 'react'
import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import { TokenAmount } from '@uniswap/sdk'
// import styled from 'styled-components'
import { createBrowserHistory } from 'history'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
// import { useAllTokenBalances } from '../../state/wallet/hooks'
import { ArrowDown } from 'react-feather'
// import TokenLogo from '../../components/TokenLogo'
import AppBody from '../AppBody'
import { ThemeContext } from 'styled-components'
import SelectCurrencyInputPanel from './selectCurrency'
import SelectChainIdInputPanel from './selectChainID'
import Reminder from './reminder'


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
// import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useLocalToken } from '../../hooks/Tokens'
// import { useToken, useLocalToken } from '../../hooks/Tokens'

import config from '../../config'

import {getAllowance} from '../../utils/bridge/approval'
import {getTokenConfig, getBaseInfo} from '../../utils/bridge/getBaseInfo'
import {formatDecimal} from '../../utils/tools/tools'
// import { maxAmountSpend } from '../../utils/maxAmountSpend'

import { isAddress } from '../../utils'


export default function Bridge() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const history = createBrowserHistory()
  const selectedTokenList = useSelectedTokenList()
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle()

  const [inputBridgeValue, setInputBridgeValue] = useState('')
  const [bridgeTypeName, setBridgeTypeName] = useState(t('bridgeAssets'))
  const [selectCurrency, setSelectCurrency] = useState<any>()
  const [selectChain, setSelectChain] = useState<any>()
  // const [approval, setApproval] = useState<any>()
  const [approvaling, setApprovaling] = useState<any>()
  // const [recipient, setRecipient] = useState<any>('0xE000E632124aa65B80f74E3e4cc06DC761610583')
  const [recipient, setRecipient] = useState<any>('')

  const [bridgeConfig, setBridgeConfig] = useState<any>()

  const formatCurrency = useLocalToken(selectCurrency)
  const amountToApprove = formatCurrency ? new TokenAmount(formatCurrency ?? undefined, inputBridgeValue) : undefined
  const [approval, approveCallback] = useApproveCallback(amountToApprove ?? undefined, config.bridgeRouterToken)
  
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useBridgeCallback(
    formatCurrency?formatCurrency:undefined,
    selectCurrency?.address,
    recipient,
    inputBridgeValue,
    selectChain
  )

  const outputBridgeValue = useMemo(() => {
    if (inputBridgeValue && bridgeConfig) {
      const fee = Number(inputBridgeValue) * Number(bridgeConfig.SwapFeeRatePerMillion)
      let value = Number(inputBridgeValue) - fee
      if (fee < Number(bridgeConfig.MinimumSwapFee)) {
        value = Number(inputBridgeValue) - Number(bridgeConfig.MinimumSwapFee)
      } else if (fee > bridgeConfig.MaximumSwapFee) {
        value = Number(inputBridgeValue) - Number(bridgeConfig.MaximumSwapFee)
      }
      if (value && Number(value)) {
        return formatDecimal(value, Math.min(6, selectCurrency.decimals))
      }
      return ''
    } else {
      return ''
    }
  }, [inputBridgeValue, bridgeConfig])

  const isCrossBridge = useMemo(() => {
    if (account && bridgeConfig && selectCurrency && inputBridgeValue && !wrapInputError && isAddress(recipient)) {
      if (Number(inputBridgeValue) < Number(bridgeConfig.MinimumSwap) || Number(inputBridgeValue) > Number(bridgeConfig.MaximumSwap)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }, [selectCurrency, account, bridgeConfig, wrapInputError, inputBridgeValue, recipient])

  const btnTxt = useMemo(() => {
    if (wrapInputError && inputBridgeValue) {
      return wrapInputError
    } else if (wrapInputError && !inputBridgeValue) {
      return bridgeTypeName
    } else if (wrapType === WrapType.WRAP) {
      return bridgeTypeName
    }
    return bridgeTypeName
  }, [bridgeTypeName, wrapInputError])

  useEffect(() => {
    if (selectedTokenList && chainId && !selectCurrency) {
      const useTokenList = config.bridgeTokenList
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
    if (account && selectCurrency) {
      if (selectCurrency.isUnderlying) {
        getAllowance(account, selectCurrency?.address).then((res:any) => {
          console.log(ApprovalState)
          console.log(res)
          setApprovaling(res)
          // setApproval(res)
        })
      }
      getTokenConfig(selectCurrency.address).then(res => {
        // console.log(res)
        if (res) {
          setBridgeConfig(res)
        } else {
          setBridgeConfig('')
        }
      })
    }
    getBaseInfo()
  }, [selectCurrency, account])

  const handleMaxInput = useCallback((value) => {
    if (value) {
      setInputBridgeValue(value)
    } else {
      setInputBridgeValue('')
    }
  }, [setInputBridgeValue])

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
            label={t('From')}
            value={inputBridgeValue}
            onUserInput={(value) => {
              setInputBridgeValue(value)
            }}
            onCurrencySelect={(inputCurrency) => {
              console.log(inputCurrency)
              setSelectCurrency(inputCurrency)
            }}
            onMax={(value) => {
              handleMaxInput(value)
            }}
            currency={formatCurrency}
            disableCurrencySelect={false}
            showMaxButton={true}
            id="selectCurrency"
          />

          <AutoRow justify="center" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable={false} style={{cursor:'pointer'}} onClick={() => {
              localStorage.setItem('ENV_NODE_CONFIG', selectChain)
              console.log(window.location.pathname)
              history.push(window.location.pathname + '#/bridge')
              history.go(0)
            }}>
              <ArrowDown size="16" color={theme.text2} />
            </ArrowWrapper>
          </AutoRow>
          {/* <SwapIcon
            onClick={() => {
              setApprovalSubmitted(false) // reset 2 step UI for approvals
              onSwitchTokens()
            }}
            iconUrl={require('../../assets/images/icon/revert.svg')}
          ></SwapIcon> */}

          <SelectChainIdInputPanel
            label={t('to')}
            value={outputBridgeValue.toString()}
            onUserInput={(value) => {
              setInputBridgeValue(value)
            }}
            onChainSelect={(chainID) => {
              setSelectChain(chainID)
            }}
            currency={formatCurrency}
            selectChainId={selectChain}
            id="selectChainID"
          />

          <AddressInputPanel id="recipient" value={recipient} onChange={setRecipient} />
        </AutoColumn>

        <Reminder bridgeConfig={bridgeConfig} bridgeType='bridgeAssets' currency={selectCurrency} />

        <BottomGrouping>
          --{approval}--
          --{(!approval || !Number(approval))}--
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
                <ButtonPrimary disabled={isCrossBridge} onClick={onWrap}>
                  {/* {wrapType}
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? bridgeTypeName : wrapType === WrapType.UNWRAP ? bridgeTypeName : bridgeTypeName)} */}
                  {btnTxt}
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