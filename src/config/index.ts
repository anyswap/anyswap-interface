// import {chainInfo} from './coinbase/nodeConfig'
import {chainInfo} from './chainConfig'

import {getNetwork, getInitBridgeChain} from './getUrlParams'
 
interface ConFig {
  [key: string]: any
}

const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
// const LOCALCONFIG = localStorage.getItem(ENV_NODE_CONFIG)
const INIT_NODE = '4'
const ENV = getNetwork(ENV_NODE_CONFIG, INIT_NODE)
const netConfig:ConFig = chainInfo[ENV] ? chainInfo[ENV] : chainInfo[INIT_NODE]

const INITBRIDGE = getInitBridgeChain(netConfig.initChain, netConfig.bridgeInitToken)

const config: ConFig = {
  ...netConfig,
  ...INITBRIDGE,
  chainInfo,
  localDataDeadline: '',
  bridgeConfigToken: '0xd96ddb35c6268cb3085003248853c39f3bfffb4b',
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
