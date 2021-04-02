// import { Token } from 'anyswap-sdk'
import { useEffect, useState } from 'react'
import v2Factory from '../constants/abis/v2_factory.json'
import { getContract, web3Fn } from '../utils/tools/web3Utils'
import config from '../config'
// import { useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks'
// import { Token } from 'anyswap-sdk'
// import { getCreate2Address } from '@ethersproject/address'
const factoryContract = getContract(v2Factory)
const fa = config.v2FactoryToken
factoryContract.options.address = fa

// export function usePairAddress(paArr: any) {

// }

// export async function getPairAddress (tokenA: Token, tokenB: Token) {
// export function usePairAddress(paArr: any) {
//   const [PairAddress, setPairAddress] = useState<any>(paArr && paArr.length > 0?[undefined] : [])
//   // console.log(paArr)
//   useEffect(() => {
//     if (paArr && paArr.length > 0 && paArr[0] !== undefined) {
//       // console.log(1)
//       const batch = new web3Fn.BatchRequest()
//       for (const obj of paArr) {
//         // console.log(obj)
//         const tokenA = obj?.tokenA?.address
//         const tokenB = obj?.tokenB?.address
//         if (tokenA && tokenB) {
//           const gpData = factoryContract.methods.getPair(tokenA, tokenB).encodeABI()
//           batch.add(web3Fn.eth.call.request({ data: gpData, to: fa }, 'latest'))
//         }
//       }
//       batch.requestManager.sendBatch(batch.requests, (err: any, res: any) => {
//         if (!err && res) {
//           const arr = []
//           for (const obj of res) {
//             if (obj && obj.result) {
//               arr.push(obj.result.replace('0x000000000000000000000000', '0x'))
//             }
//           }
//           if (arr.length > 0) {
//             setPairAddress(arr)
//           } else {
//             setPairAddress([])
//           }
//         }
//       })
//     } else if (paArr && paArr.length > 0 && paArr[0] === undefined) {
//       // console.log(2)
//       setPairAddress([undefined])
//     } else {
//       // console.log(3)
//       setPairAddress([])
//     }
//   }, [paArr])
//   return PairAddress
// }

export function usePairAddress(tokens: any) {
  const [PairAddress, setPairAddress] = useState<any>(tokens && tokens.length > 0 ? [undefined] : [])
  // console.log(paArr)
  useEffect(() => {
    const paArr = tokens.map(([tokenA, tokenB]: any) => {
      // console.log(tokenA?.address)
      // console.log(tokenB?.address)
      return tokenA && tokenB && !tokenA.equals(tokenB) ? { tokenA, tokenB } : undefined
    })
    if (paArr && paArr.length > 0 && paArr[0] !== undefined) {
      // console.log(1)
      const batch = new web3Fn.BatchRequest()
      for (const obj of paArr) {
        // console.log(obj)
        const tokenA = obj?.tokenA?.address
        const tokenB = obj?.tokenB?.address
        if (tokenA && tokenB) {
          const gpData = factoryContract.methods.getPair(tokenA, tokenB).encodeABI()
          batch.add(web3Fn.eth.call.request({ data: gpData, to: fa }, 'latest'))
        }
      }
      batch.requestManager.sendBatch(batch.requests, (err: any, res: any) => {
        if (!err && res) {
          const arr = []
          for (const obj of res) {
            if (obj && obj.result) {
              arr.push(obj.result.replace('0x000000000000000000000000', '0x'))
            }
          }
          if (arr.length > 0) {
            setPairAddress(arr)
          } else {
            setPairAddress([])
          }
        }
      })
    } else if (paArr && paArr.length > 0 && paArr[0] === undefined) {
      // console.log(2)
      setPairAddress([undefined])
    } else {
      // console.log(3)
      setPairAddress([])
    }
  }, [tokens])
  return PairAddress
}
