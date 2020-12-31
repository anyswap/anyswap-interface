import v2Factory from '../../constants/abis/v2_factory.json'
import { getContract } from './web3Utils'
// import { Token } from '@uniswap/sdk'
// import { getCreate2Address } from '@ethersproject/address'
const factoryContract = getContract(v2Factory)
factoryContract.options.address = '0x5C487A8a1915655bB9863d59D2519c01C1A427d7'

export async function getPairAddress(tokenA: any, tokenB: any) {
  // console.log(tokenA)
  // console.log(tokenB)
  // console.log(contract.methods.getPair(tokenA, tokenB))
  return factoryContract.methods.getPair(tokenA, tokenB).call()
  // return new Promise(resolve => {
  //   factoryContract.methods.getPair(tokenA, tokenB).call((err:any, res:any) => {
  //     // console.log(err)
  //     // console.log(res)
  //     if (!err) {
  //       resolve(res)
  //     }
  //   })
  // })
  // getCreate2Address(
  //   FACTORY_ADDRESS,
  //   keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
  //   INIT_CODE_HASH
  // )
  // return contract
}
