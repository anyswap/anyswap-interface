// import React, { useEffect, useMemo, useState } from 'react'
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { createBrowserHistory } from 'history'
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
import { useToken } from '../../hooks/Tokens'

import config from '../../config'

// import {test} from '../../utils/tools/getPairAddress'
// import {getBaseInfo} from '../../utils/bridge/getBaseInfo'
import {getAllowance} from '../../utils/bridge/approval'
import {getTokenConfig} from '../../utils/bridge/getBaseInfo'
import {thousandBit} from '../../utils/tools/tools'

import BulbIcon from '../../assets/images/icon/bulb.svg'

const SubCurrencySelectBox = styled.div`
  width: 100%;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  background-color: ${({ theme }) => theme.tipBg};
  padding: 1rem 1.25rem;
  margin-top: 0.625rem;

  .tip {
    ${({ theme }) => theme.flexSC};
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.tipColor};
    padding: 2px 20px 18px;
    border-bottom: 1px solid #f1f6fa;
    word-break:break-all;
    img {
      display:inlne-block;
    }
    p {
      ${({ theme }) => theme.flexSC};
      flex-wrap:wrap;
      display:inline-block;
      margin: 0;
      line-height: 1rem;
      .span {
        text-decoration: underline;
        margin: 0 5px;
      }
      a {
        display:inline-block;
        overflow:hidden;
        height: 1rem;
      }
    }
  }
  .list {
    margin:0;
    padding: 0 0px 0;
    font-size: 12px;
    color: ${({ theme }) => theme.tipColor};
    dt {
      ${({ theme }) => theme.flexSC};
      font-weight: bold;
      line-height: 1.5;
      img {
        margin-right: 8px;
      }
    }
    dd {
      font-weight: 500;
      line-height: 1.83;
      i{
        display:inline-block;
        width:4px;
        height: 4px;
        border-radius:100%;
        background:${({ theme }) => theme.tipColor};
        margin-right: 10px;
      }
    }
  }
`

export default function Bridge() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const history = createBrowserHistory()
  // const balances = useAllTokenBalances()
  const selectedTokenList = useSelectedTokenList()
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle()

  const [inputBridgeValue, setInputBridgeValue] = useState('')
  const [outputBridgeValue, setOutputBridgeValue] = useState('')
  const [bridgeTypeName, setBridgeTypeName] = useState(t('bridgeAssets'))
  const [selectCurrency, setSelectCurrency] = useState<any>()
  const [selectChain, setSelectChain] = useState<any>()
  // const [approval, setApproval] = useState<any>()
  const [approvaling, setApprovaling] = useState<any>()
  // const [recipient, setRecipient] = useState<any>('0xE000E632124aa65B80f74E3e4cc06DC761610583')
  const [recipient, setRecipient] = useState<any>('')

  const [bridgeConfig, setBridgeConfig] = useState<any>()

  const [isCrossBridge, setIsCrossBridge] = useState<any>(true)

  const [approval, approveCallback] = useApproveCallback(undefined, selectCurrency?.address)

  // const { currencies } = useDerivedSwapInfo()

  const useCurrency = useToken(selectCurrency?.address)
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useBridgeCallback(
    useCurrency?useCurrency:undefined,
    selectCurrency?.address,
    recipient,
    inputBridgeValue,
    selectChain
  )

  // const outputBridgeValue = bridgeConfig && inputBridgeValue ? (Number(inputBridgeValue) * (1 - bridgeConfig.SwapFeeRate)).toFixed(Math.min(6, selectCurrency.decimals)) : ''

  useEffect(() => {
    if (account && bridgeConfig && selectCurrency && inputBridgeValue && !wrapInputError) {
      if (Number(inputBridgeValue) < bridgeConfig.MinimumSwap || Number(inputBridgeValue) > bridgeConfig.MaximumSwap) {
        setIsCrossBridge(true)
        setOutputBridgeValue('')
      } else {
        setIsCrossBridge(false)
        const fee = Number(inputBridgeValue) * bridgeConfig.SwapFeeRate
        let value = (Number(inputBridgeValue) * (1 - bridgeConfig.SwapFeeRate))
        if (fee < bridgeConfig.MinimumSwapFee) {
          value = Number(inputBridgeValue) - bridgeConfig.MinimumSwapFee
        } else if (fee > bridgeConfig.MaximumSwapFee) {
          value = Number(inputBridgeValue) - bridgeConfig.MaximumSwapFee
        }
        setOutputBridgeValue(value.toFixed(Math.min(6, selectCurrency.decimals)))
      }
    } else {
      setOutputBridgeValue('')
      setIsCrossBridge(true)
    }
  }, [chainId, selectCurrency, account, bridgeConfig, wrapInputError, inputBridgeValue])

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
    if (account && selectCurrency) {
      if (selectCurrency.isUnderlying) {
        getAllowance(account, selectCurrency?.address).then((res:any) => {
          console.log(ApprovalState)
          console.log(res)
          setApprovaling('')
          // setApproval(res)
        })
      }
      getTokenConfig(selectCurrency.address).then(res => {
        console.log(res)
        if (res) {
          setBridgeConfig(res)
        } else {
          setBridgeConfig('')
        }
      })
      // console.log(WrapType)
    }
  }, [selectCurrency, account])

  function onBridge() {
    if (wrapInputError && inputBridgeValue) {
      return wrapInputError
    } else if (wrapInputError && !inputBridgeValue) {
      return bridgeTypeName
    } else if (wrapType === WrapType.WRAP) {
      return bridgeTypeName
    }
    return bridgeTypeName
  }

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
            <ArrowWrapper clickable={false} style={{cursor:'pointer'}} onClick={() => {
              localStorage.setItem('ENV_NODE_CONFIG', selectChain)
              console.log(window.location.pathname)
              history.push(window.location.pathname + '#/bridge')
              history.go(0)
            }}>
              <ArrowDown size="16" color={theme.text2} />
            </ArrowWrapper>
          </AutoRow>

          <SelectChainIdInputPanel
            value={outputBridgeValue.toString()}
            onUserInput={(value) => {
              setInputBridgeValue(value)
            }}
            onChainSelect={(chainID) => {
              setSelectChain(chainID)
            }}
            currency={selectCurrency}
            selectChainId={selectChain}
            id="selectChainID"
          ></SelectChainIdInputPanel>

          {/* <AutoRow justify="center" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable={false}>
              <ArrowDown size="16" color={theme.text2} />
            </ArrowWrapper>
          </AutoRow> */}
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
                <ButtonPrimary disabled={isCrossBridge} onClick={onWrap}>
                  {/* {wrapType}
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? bridgeTypeName : wrapType === WrapType.UNWRAP ? bridgeTypeName : bridgeTypeName)} */}
                  {onBridge()}
                    {/* (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)} */}
                </ButtonPrimary>
              )
            )
          }
        </BottomGrouping>
        {
          bridgeConfig ? (
            <SubCurrencySelectBox>
              <dl className='list'>
                <dt>
                  <img src={BulbIcon} alt='' />
                  {t('Reminder')}:
                </dt>
                <dd><i></i>{t('mintTip1', {
                  dMinFee: bridgeConfig.MinimumSwapFee,
                  coin: selectCurrency.symbol,
                  dMaxFee: bridgeConfig.MaximumSwapFee,
                  dFee: bridgeConfig.SwapFeeRate * 100
                })}</dd>
                <dd><i></i>{t('mintTip2')} {thousandBit(bridgeConfig.MinimumSwap, 'no')} {selectCurrency.symbol}</dd>
                <dd><i></i>{t('mintTip3')} {thousandBit(bridgeConfig.MaximumSwap, 'no')} {selectCurrency.symbol}</dd>
                <dd><i></i>{t('mintTip4')}</dd>
                <dd><i></i>{t('mintTip5', {
                  depositBigValMoreTime: thousandBit(bridgeConfig.BigValueThreshold, 'no'),
                  coin: selectCurrency.symbol,
                }) + (selectCurrency.symbol ? '' : '')}</dd>
              </dl>
            </SubCurrencySelectBox>
          ) : ''
        }
      </AppBody>
    </>
  )
}