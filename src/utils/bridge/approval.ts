import erc20 from '../../constants/abis/erc20.json'
import { getContract, web3Fn } from '../tools/web3Utils'
import config from '../../config'

const erc20Contract = getContract(erc20)

export function getAllowance (account:string, token:string) {
  return new Promise(resolve => {
    web3Fn.setProvider(config.nodeRpc)
    erc20Contract.options.address = token
    erc20Contract.methods.allowance(account, config.bridgeRouterToken).call((err:any, res:any) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
        resolve(res)
      }
    })
  })
}