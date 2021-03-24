import v2Factory from '../../constants/abis/v2_factory.json'
import { getContract, web3Fn } from './web3Utils'
import config from '../../config'
// import { Token } from '@uniswap/sdk'
// import { getCreate2Address } from '@ethersproject/address'
const factoryContract = getContract(v2Factory)
const fa = config.factoryToken
factoryContract.options.address = fa
// export async function getPairAddress (tokenA: Token, tokenB: Token) {
export function getPairsAddress(paArr: any) {
  // console.log(paArr)
  return new Promise(resolve => {
    if (paArr && paArr.length > 0 && paArr[0]) {
      // console.log(1)
      const batch = new web3Fn.BatchRequest()
      for (const obj of paArr) {
        let tokenA, tokenB
        if (obj && obj.tokenA && obj.tokenB) {
          tokenA = obj?.tokenA
          tokenB = obj?.tokenB
        } else {
          ;[tokenA, tokenB] = obj
        }
        if (tokenA && tokenB) {
          const gpData = factoryContract.methods.getPair(tokenA?.address, tokenB?.address).encodeABI()
          batch.add(web3Fn.eth.call.request({ data: gpData, to: fa }, 'latest'))
        }
      }
      batch.requestManager.sendBatch(batch.requests, (err: any, res: any) => {
        if (!err && res) {
          const arr = []
          // console.log(res)
          for (let i = 0, len = res.length; i < len; i++) {
            const obj = res[i]
            // console.log(parseFloat(obj.result))
            if (
              obj &&
              obj.result &&
              obj.result !== '0x0000000000000000000000000000000000000000000000000000000000000000' &&
              obj.result !== '0x'
            ) {
              arr.push({
                ...paArr[i][0],
                pairAddress: obj.result.replace('0x000000000000000000000000', '0x'),
                tokens: paArr[i]
              })
            } else {
              arr.push({
                ...paArr[i][0],
                pairAddress: '',
                tokens: paArr[i]
              })
            }
          }
          // console.log(res)
          if (arr.length > 0) {
            resolve(arr)
          } else {
            resolve()
          }
        }
      })
    } else if (paArr && paArr.length > 0 && paArr[0] === undefined) {
      // console.log(2)
      resolve(undefined)
    } else {
      // console.log(3)
      resolve(undefined)
    }
  })
}

export function getPairAddress(tokenA: any, tokenB: any) {
  const getPA = () => {
    return new Promise(resolve => {
      factoryContract.methods.getPair(tokenA, tokenB).call((err: any, res: any) => {
        if (!err) {
          console.log(res)
          resolve(res)
        } else {
          resolve('')
        }
      })
    })
  }
  return getPA()
}

export function test () {
  console.log(factoryContract)
  web3Fn.setProvider(config.nodeRpc)
  console.log(web3Fn)
  console.log(config)
  factoryContract.methods.allPairs(0).call((err: any, res: any) => {
  // factoryContract.methods.allPairsLength().call((err: any, res: any) => {
    console.log(err)
    console.log(res)
  })
  factoryContract.methods.allPairsLength().call((err: any, res: any) => {
    console.log(err)
    console.log(res)
  })
}
