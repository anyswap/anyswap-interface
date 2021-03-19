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


// const 
export default function Bridge() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  // const balances = useAllTokenBalances()

  const [inputBridgeValue, setInputBridgeValue] = useState('')

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
        {account}
      </AppBody>
    </>
  )
}