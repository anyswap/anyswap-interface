import RouterConfig from '../../constants/abis/bridge/RouterConfig.json'
import { getContract, web3Fn } from '../tools/web3Utils'
import config from '../../config'

const routerContract = getContract(RouterConfig)

export function getBaseInfo () {
  web3Fn.setProvider(config.nodeRpc)
  routerContract.options.address = '0x95bf7e307bc1ab0ba38ae10fc27084bc36fcd605'
  routerContract.methods.getChainConfig('32659').call((err:any, res:any) => {
  // routerContract.methods.getChainConfig(config.chainID).call((err:any, res:any) => {
    console.log(err)
    console.log(res)
  })
}