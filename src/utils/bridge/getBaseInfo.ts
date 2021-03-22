import RouterConfig from '../../constants/abis/bridge/RouterConfig.json'
import { getContract, web3Fn } from '../tools/web3Utils'
import config from '../../config'

// import {formatWeb3Str} from '../tools/tools'

const routerContract = getContract(RouterConfig)
// console.log(config)
const chainID = '46688'

const routerConfigToken = '0x77bc292e465cfff6dda1fd5ca67a2a1320d2657e'


function getChainConfig (list:Array<[]>) {
  return new Promise(resolve => {
    const batch = new web3Fn.BatchRequest()
    for (const chainid of list) {
      const data = routerContract.methods.getChainConfig(chainid).encodeABI()
      batch.add(web3Fn.eth.call.request({data: data, to: routerConfigToken}, 'latest', (err:any, res:any) => {
        if (err) {
          console.log(err)
        } else {
          const results = res.substr(130)
          if (results) {
            console.log(JSON.parse(web3Fn.utils.hexToUtf8('0x' + results)))
          }
        }
        resolve('')
      }))
    }

    batch.execute()
  })
}

export function getBaseInfo () {
  web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
  routerContract.options.address = routerConfigToken

  routerContract.methods.getAllChainIDs().call((err:any, res:any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
      getChainConfig(res)
    }
  })

  
  routerContract.methods.getTokenIDCount().call((err:any, res:any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })

  routerContract.methods.getAllTokenIDs().call((err:any, res:any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })

  // routerContract.methods.getMultichainTokenOnChain(chainID, '1').call((err:any, res:any) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(res)
  //   }
  // })

  
  routerContract.methods.getMultichainTokenCount('0').call((err:any, res:any) => {
    console.log(err)
    console.log(res)
    if (res) {
      console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
    }
  })
  
  // routerContract.methods.getChainConfig(chainID).call((err:any, res:any) => {
  //   console.log(err)
  //   console.log(res)
  //   if (res) {
  //     console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
  //   }
  // })
  // routerContract.methods.getTokenConfig(chainID, '0x897A9980808a2CAe0d09fF693f02a4F80ABB2233').call((err:any, res:any) => {
  //   console.log(err)
  //   console.log(res)
  //   if (res) {
  //     console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
  //   }
  // })

  
}