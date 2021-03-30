import RouterConfig from '../../constants/abis/bridge/RouterConfig.json'
import { getContract, web3Fn } from '../tools/web3Utils'
import {setLocalConfig, getLocalConfig, formatWeb3Str} from '../tools/tools'
import config from '../../config'

// import {formatWeb3Str} from '../tools/tools'

const routerContract = getContract(RouterConfig)
const chainID = config.bridgeInitDataChain

interface ObjType {
  [key: string]: any
}

// 获取单条链配置
const BRIDGEALLCHAINCONFIG = 'BRIDGEALLCHAINCONFIG'
export function getChainConfig () {
  return new Promise(resolve => {
    const lData = getLocalConfig(BRIDGEALLCHAINCONFIG, BRIDGEALLCHAINCONFIG, config.chainID, BRIDGEALLCHAINCONFIG, 1000 * 60 * 10)
    if (lData) {
      resolve(lData.list)
    } else {
      web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
      routerContract.options.address = config.bridgeConfigToken
      routerContract.methods.getChainConfig(config.chainID).call((err:any, res:any) => {
        if (err) {
          resolve(false)
        } else {
          const results = res
          if (results) {
            const obj = JSON.parse(web3Fn.utils.hexToUtf8(results))
            setLocalConfig(BRIDGEALLCHAINCONFIG, BRIDGEALLCHAINCONFIG, config.chainID, BRIDGEALLCHAINCONFIG, {list: obj})
            resolve(obj)
          } else {
            resolve(false)
          }
        }
      })
    }
  })
}
// 获取所有链配置
export function getAllChainConfig (list:Array<[]>) {
  return new Promise(resolve => {
    const lData = getLocalConfig(BRIDGEALLCHAINCONFIG, BRIDGEALLCHAINCONFIG, config.chainID, BRIDGEALLCHAINCONFIG, 1000 * 60 * 10)
    if (lData) {
      resolve(lData.list)
    } else {
      web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
      const batch = new web3Fn.BatchRequest()
      // for (const chainid of list) {
      const len = list.length
      for (let i = 0; i < len; i++) {
        const chainid = list[i]
        const data = routerContract.methods.getChainConfig(chainid).encodeABI()
        batch.add(web3Fn.eth.call.request({data: data, to: config.bridgeConfigToken}, 'latest', (err:any, res:any) => {
          if (err) {
            console.log(err)
            resolve('')
          } else {
            const results = res.substr(130)
            if (results) {
              setLocalConfig(BRIDGEALLCHAINCONFIG, BRIDGEALLCHAINCONFIG, chainid, BRIDGEALLCHAINCONFIG, {list: JSON.parse(web3Fn.utils.hexToUtf8('0x' + results))})
            }
            const lData1 = getLocalConfig(BRIDGEALLCHAINCONFIG, BRIDGEALLCHAINCONFIG, config.chainID, BRIDGEALLCHAINCONFIG, 1000 * 60 * 10)
            if (lData1) {
              resolve(lData1)
            } else if (i === (len - 1)) {
              resolve('')
            }
          }
        }))
      }

      batch.execute()
    }
  })
}

// 校验合约是否可以跨链
export function isTokenIDExist (token:any) {
  return new Promise(resolve => {
    web3Fn.setProvider(config.nodeRpc)
    routerContract.options.address = config.bridgeConfigToken
    routerContract.methods.isTokenIDExist(token).call((err:any, res:any) => {
      if (err) {
        console.log(err)
        resolve(false)
      } else {
        resolve(res)
      }
    })
  })
}

// 获取可支持跨链的ID
const BRIDGEALLCHAIN = 'BRIDGEALLCHAIN'
export function getAllChainIDs () {
  return new Promise(resolve => {
    const lData = getLocalConfig(BRIDGEALLCHAIN, BRIDGEALLCHAIN, BRIDGEALLCHAIN, BRIDGEALLCHAIN, 1000 * 60 * 10)
    if (lData) {
      resolve(lData.list)
    } else {
      web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
      routerContract.options.address = config.bridgeConfigToken
    
      routerContract.methods.getAllChainIDs().call((err:any, res:any) => {
        if (err) {
          console.log(err)
          resolve([])
        } else {
          setLocalConfig(BRIDGEALLCHAIN, BRIDGEALLCHAIN, BRIDGEALLCHAIN, BRIDGEALLCHAIN, {list: res})
          resolve(res)
        }
      })
    }
  })
}

// 获取合约配置
const BRIDGETOKENCONFIG = 'BRIDGETOKENCONFIG'
export function getTokenConfig(token:any) {
  return new Promise(resolve => {
    // web3Fn.setProvider(config.nodeRpc)
    const lData = getLocalConfig(BRIDGETOKENCONFIG, token, config.chainID, BRIDGETOKENCONFIG, 1000 * 60 * 30)
    if (lData) {
      resolve(lData.list)
    } else {
      web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
      // web3Fn.setProvider(config.nodeRpc)
      routerContract.options.address = config.bridgeConfigToken
      
      // routerContract.methods.getMultichainToken(token).call((err:any, res:any) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log(res)
      //   }
      // })
      routerContract.methods.getTokenConfig(config.chainID, token).call((err:any, res:any) => {
        if (err) {
          console.log(err)
          resolve(false)
        } else {
          const results:ObjType = {}
          for (const obj in res) {
            results[obj] = res[obj]
          }
          console.log(res)
          // setLocalConfig(BRIDGETOKENCONFIG, token, config.chainID, BRIDGETOKENCONFIG, {list: results})
          resolve(res)
        }
      })
    }
  })
}

export function getAllTokenConfig (list:Array<[]>, token:any) {
  return new Promise(resolve => {
    const lData = getLocalConfig(BRIDGETOKENCONFIG, token, config.chainID, BRIDGETOKENCONFIG, 1000 * 60 * 10)
    if (lData) {
      resolve(lData.list)
    } else {
      web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
      const batch = new web3Fn.BatchRequest()
      // for (const chainid of list) {
      const len = list.length
      for (let i = 0; i < len; i++) {
        const tokenid = list[i]
        console.log(tokenid)
        const data = routerContract.methods.getTokenConfig(tokenid, config.chainID).encodeABI()
        batch.add(web3Fn.eth.call.request({data: data, to: config.bridgeConfigToken}, 'latest', (err:any, res:any) => {
          if (err) {
            console.log(err)
            resolve('')
          } else {
            console.log(res)
            console.log(web3Fn.utils.hexToUtf8(formatWeb3Str(res)[1]))
            const results = res.substr(130)
            console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
            console.log(JSON.parse(web3Fn.utils.hexToUtf8('0x' + results)))
            // if (results) {
            //   setLocalConfig(BRIDGETOKENCONFIG, BRIDGETOKENCONFIG, config.chainID, BRIDGETOKENCONFIG, {list: JSON.parse(web3Fn.utils.hexToUtf8('0x' + results))})
            // }
            // const lData1 = getLocalConfig(BRIDGETOKENCONFIG, BRIDGETOKENCONFIG, config.chainID, BRIDGETOKENCONFIG, 1000 * 60 * 10)
            // if (lData1) {
            //   resolve(lData1)
            // } else if (i === (len - 1)) {
            //   resolve('')
            // }
          }
        }))
      }

      batch.execute()
    }
  })
}

export function getAllTokenIDs (token:any) {
  return new Promise(resolve => {
    web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
    routerContract.options.address = config.bridgeConfigToken
  
    routerContract.methods.getAllTokenIDs().call((err:any, res:any) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
        getAllTokenConfig(res, token).then(results => {
          console.log(results)
        })
      }
      // resolve(res)
    })
  })
}

export function getBaseInfo () {
  web3Fn.setProvider(config.chainInfo[chainID].nodeRpc)
  routerContract.options.address = config.bridgeConfigToken

  routerContract.methods.getAllChainIDs().call((err:any, res:any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
      // getChainConfig(res)
    }
  })

  
  // routerContract.methods.getTokenIDCount().call((err:any, res:any) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(res)
  //   }
  // })

  // routerContract.methods.getAllTokenIDs().call((err:any, res:any) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(res)
  //   }
  // })

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
      // console.log(JSON.parse(web3Fn.utils.hexToUtf8(res)))
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