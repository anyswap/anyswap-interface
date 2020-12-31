// import { Token } from '@uniswap/sdk'
import { useEffect, useState } from 'react'
import v2Factory from '../constants/abis/v2_factory.json'
import { getContract, web3Fn } from '../utils/tools/web3Utils'
// import { Token } from '@uniswap/sdk'
// import { getCreate2Address } from '@ethersproject/address'
const factoryContract = getContract(v2Factory)
const fa = '0x5C487A8a1915655bB9863d59D2519c01C1A427d7'
factoryContract.options.address = fa

// export async function getPairAddress (tokenA: Token, tokenB: Token) {
export function usePairAddress(paObj: any) {
  const [PairAddress, setPairAddress] = useState<any>([])

  useEffect(() => {
    if (paObj && paObj.length > 0) {
      const batch = new web3Fn.BatchRequest()
      for (const obj of paObj) {
        console.log(obj)
        const gpData = factoryContract.methods.getPair(obj?.tokenA?.address, obj?.tokenB?.address).encodeABI()
        batch.add(web3Fn.eth.call.request({ data: gpData, to: fa }, 'latest'))
      }
      batch.requestManager.sendBatch(batch.requests, (err: any, res: any) => {
        if (!err && res) {
          const arr = []
          for (const obj of res) {
            if (obj && obj.result) {
              arr.push(obj.result.replace('0x000000000000000000000000', '0x'))
            }
          }
          setPairAddress(arr)
        }
      })
    }
  }, [paObj])
  return PairAddress
}
