import {formatSwapTokenList, formatBridgeTokenList} from './methods'
import {tokenListUrl} from '../constant'

export const ARBITRUM_TESTNET = 'https://kovan4.arbitrum.io/rpc'
export const ARBITRUM_TEST_CHAINID = 212984383488152
export const ARBITRUM_TEST_EXPLORER = 'https://explorer.arbitrum.io/#/'

export const tokenList = [

]

const symbol = 'ARBITRUM'

export default {
  [ARBITRUM_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + ARBITRUM_TEST_CHAINID,
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
    nodeRpc: ARBITRUM_TESTNET,
    chainID: ARBITRUM_TEST_CHAINID,
    lookHash: ARBITRUM_TEST_EXPLORER + '/tx/',
    lookAddr: ARBITRUM_TEST_EXPLORER + '/address/',
    lookBlock: ARBITRUM_TEST_EXPLORER + '/block/',
    explorer: ARBITRUM_TEST_EXPLORER,
    symbol: symbol,
    name: 'Arbitrum',
    type: 'main',
    label: ARBITRUM_TEST_CHAINID,
    isSwitch: 1,
    suffix: 'ARBITRUM'
  },
}