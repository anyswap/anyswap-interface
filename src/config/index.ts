// import {chainInfo} from './coinbase/nodeConfig'
import {chainInfo} from './chainConfig'

import {getNetwork, getInitBridgeChain} from './getUrlParams'
 
interface ConFig {
  [key: string]: any
}

const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
// const LOCALCONFIG = localStorage.getItem(ENV_NODE_CONFIG)
const ENV = getNetwork(ENV_NODE_CONFIG, '4')
const netConfig:ConFig = chainInfo[ENV]
const INITBRIDGE = getInitBridgeChain(netConfig.initChain, netConfig.bridgeInitToken)

const config: ConFig = {
  ...netConfig,
  ...INITBRIDGE,
  chainInfo,
  localDataDeadline: '',
  bridgeConfigToken: '0x5d47bAbA0d66083C52009271faF3F50DCc01023C',
  bridgeInitDataChain: '256',
  getBaseCoin (value:any, type: number) {
    if (value && value === 'BASECURRENCY') {
      if (type) {
        return netConfig.name
      } else {
        return netConfig.symbol
      }
    } else if (value && value === 'WETH') {
      return 'W' + netConfig.symbol
    } else {
      return value
    }
  }
}
export default config
