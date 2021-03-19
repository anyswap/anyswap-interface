import RouterConfig from '../../constants/abis/bridge/RouterConfig.json'
import { getContract, web3Fn } from '../tools/web3Utils'
import config from '../../config'

const routerContract = getContract(RouterConfig)
// console.log(config)
const chainID = '46688'
export function getBaseInfo () {
  web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
  routerContract.options.address = '0x77bc292e465cfff6dda1fd5ca67a2a1320d2657e'
  routerContract.methods.getChainConfig(chainID).call((err:any, res:any) => {
  // routerContract.methods.getChainConfig(config.chainID).call((err:any, res:any) => {
    console.log(err)
    console.log(res)
    if (res) {
      console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
    }
  })

  // routerContract.methods.getTokenIDAtIndex(0).call((err:any, res:any) => {
  //   console.log(err)
  //   console.log(res)
  // })

  routerContract.methods.getTokenConfig(chainID, '0x897A9980808a2CAe0d09fF693f02a4F80ABB2233').call((err:any, res:any) => {
    console.log(err)
    console.log(res)
    if (res) {
      console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
    }
  })

  
}