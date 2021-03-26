// import {chainInfo} from './coinbase/nodeConfig'
import {chainInfo} from './chainConfig'
 
interface ConFig {
  [key: string]: any
}

const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
const LOCALCONFIG = localStorage.getItem(ENV_NODE_CONFIG)
const ENV = LOCALCONFIG ? LOCALCONFIG : '4'
const netConfig:ConFig = chainInfo[ENV]
// console.log(netConfig)

const config: ConFig = {
  ...netConfig,
  chainInfo,
  localDataDeadline: '',
  bridgeConfigToken: '0x264c1383ea520f73dd837f915ef3a732e204a493',
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
