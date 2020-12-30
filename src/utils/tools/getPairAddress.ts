import v2Factory from '../../constants/abis/v2_factory.json'
import {getContract} from './web3Utils'

export function getPairAddress () {
  const contract = getContract(v2Factory)
  return contract
}