import {formatSwapTokenList, formatBridgeTokenList} from './methods'
import {tokenListUrl} from '../constant'

export const AVAX_MAINNET = 'https://api.avax.network/ext/bc/C/rpc'
export const AVAX_MAIN_CHAINID = 43114
export const AVAX_MAIN_EXPLORER = 'https://cchain.explorer.avax.network/'

export const tokenList = [

]

const symbol = 'AVAX'

export default {
  [AVAX_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + AVAX_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    bridgeTokenList: formatBridgeTokenList(tokenList),
    bridgeInitToken: '',
    bridgeRouterToken: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    timelock: '',
    initChain: '',
    nodeRpc: AVAX_MAINNET,
    chainID: AVAX_MAIN_CHAINID,
    lookHash: AVAX_MAIN_EXPLORER + '/tx/',
    lookAddr: AVAX_MAIN_EXPLORER + '/address/',
    lookBlock: AVAX_MAIN_EXPLORER + '/block/',
    explorer: AVAX_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Avalanche',
    type: 'main',
    label: AVAX_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'AVAX'
  },
}