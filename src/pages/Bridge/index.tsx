// import React, { useEffect, useMemo, useState } from 'react'
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
// import { useAllTokenBalances } from '../../state/wallet/hooks'

// import TokenLogo from '../../components/TokenLogo'
import AppBody from '../AppBody'
import Title from '../../components/Title'

// import config from '../../config'
import SelectCurrencyInputPanel from './selectCurrency'

import {getBaseInfo} from '../../utils/bridge/getBaseInfo'

import useBridgeCallback from '../../hooks/useBridgeCallback'
import { WrapType } from '../../hooks/useWrapCallback'
import { useDerivedSwapInfo } from '../../state/swap/hooks'

// import { ButtonError, ButtonLight, ButtonPrimary, ButtonConfirmed } from '../../components/Button'
import { ButtonPrimary } from '../../components/Button'
import { useSelectedTokenList } from '../../state/lists/hooks'


// const 
export default function Bridge() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  // const balances = useAllTokenBalances()
  const selectedTokenList = useSelectedTokenList()

  const [inputBridgeValue, setInputBridgeValue] = useState('')

  const { currencies } = useDerivedSwapInfo()
  console.log(currencies)
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useBridgeCallback(
    currencies['INPUT'],
    '',
    '0x0',
    ''
  )
    console.log(selectedTokenList)
  useEffect(() => {
    getBaseInfo()
  }, [])
  return (
    <>
      <AppBody>
        <Title
          title={t('bridgeAssets')}
          tabList={[
            {
              name: t('bridgeAssets'),
              onTabClick: name => {
                console.log(name)
              },
              iconUrl: require('../../assets/images/icon/deposit.svg'),
              iconActiveUrl: require('../../assets/images/icon/deposit-purple.svg')
            },
            {
              name: t('bridgeTxns'),
              onTabClick: name => {
                console.log(name)
              },
              iconUrl: require('../../assets/images/icon/withdraw.svg'),
              iconActiveUrl: require('../../assets/images/icon/withdraw-purple.svg')
            }
          ]}
        ></Title>
        <SelectCurrencyInputPanel
          value={inputBridgeValue}
          onUserInput={(value) => {
            console.log(value)
            setInputBridgeValue(value)
          }}
          showMaxButton={true}
          id="test"
        ></SelectCurrencyInputPanel>
        <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
          {wrapInputError ??
            (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
        </ButtonPrimary>
        {account}
      </AppBody>
    </>
  )
}