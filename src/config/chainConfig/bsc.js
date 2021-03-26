import {formatSwapTokenList, formatBridgeTokenList} from './methods'
import {tokenListUrl} from '../constant'

export const BNB_MAINNET = 'https://bsc-dataseed1.binance.org/'
export const BNB_MAIN_CHAINID = 56
export const BNB_MAIN_EXPLORER = 'https://bscscan.com'

export const BNB_TESTNET = 'https://data-seed-prebsc-1-s1.binance.org:8545'
export const BNB_TEST_CHAINID = 97
export const BNB_TEST_EXPLORER = 'https://explorer.binance.org/smart-testnet'

export const tokenList = [
  {
    "address": "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
    "chainId": BNB_MAIN_CHAINID,
    "decimals": 18,
    "name": "",
    "symbol": ""
  }
]

export const testTokenList = [

]

const symbol = 'BNB'

export default {
  [BNB_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + BNB_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    bridgeTokenList: formatBridgeTokenList(tokenList),
    bridgeInitToken: '',
    bridgeToken: '',
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    initToken: '',
    multicalToken: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    initChain: '',
    nodeRpc: BNB_MAINNET,
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    lookBlock: BNB_MAIN_EXPLORER + '/block/',
    explorer: BNB_MAIN_EXPLORER,
    symbol: symbol,
    name: 'BSC',
    type: 'main',
    label: BNB_MAIN_CHAINID,
    isSwitch: 1
  },
  [BNB_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + BNB_TEST_CHAINID,
    tokenList: formatSwapTokenList(symbol, testTokenList),
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    bridgeRouterToken: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    timelock: '',
    initChain: '',
    nodeRpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    lookBlock: BNB_TEST_EXPLORER + '/block/',
    explorer: BNB_TEST_EXPLORER,
    symbol: symbol,
    name: 'BSC',
    type: 'test',
    label: BNB_TEST_CHAINID,
    isSwitch: 1
  }
}