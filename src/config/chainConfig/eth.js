import {formatSwapTokenList, formatBridgeTokenList} from './methods'
import {tokenListUrl} from '../constant'

const navLang = navigator.language

export const ETH_MAINNET = 'https://ethmainnet.anyswap.exchange'
// export const ETH_MAINNET = 'https://mainnet.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
export const ETH_MAIN_CHAINID = 1
export const ETH_MAIN_EXPLORER = navLang === 'zh-CN' ? 'https://cn.etherscan.com' : 'https://etherscan.io'

export const ETH_TESTNET = 'https://rinkeby.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
export const ETH_TEST_CHAINID = 4
export const ETH_TEST_EXPLORER = 'https://rinkeby.etherscan.io'

export const tokenList = [
  {
    "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "chainId": ETH_MAIN_CHAINID,
    "decimals": 6,
    "name": "USDC",
    "symbol": "USDC",
    "isUnderlying": 0,
    "isCrossChain": 1
  }
]

export const testTokenList = [
  {
    "address": "0x5d9ab5522c64e1f6ef5e3627eccc093f56167818",
    "chainId": ETH_TEST_CHAINID,
    "decimals": 6,
    "name": "AAA",
    "symbol": "AAA",
    "isUnderlying": 0,
    "isCrossChain": 1
  },
  {
    "address": "0xb09bad01684f6d47fc7dc9591889cc77eaed8d22",
    "chainId": ETH_TEST_CHAINID,
    "decimals": 6,
    "name": "USDT",
    "symbol": "USDT",
    "isUnderlying": 1,
    "isCrossChain": 1
  }
]

const symbol = 'ETH'

export default {
  [ETH_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + ETH_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    bridgeTokenList: formatBridgeTokenList(tokenList),
    bridgeInitToken: '',
    bridgeToken: '',
    router: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    initToken: '',
    multicalToken: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    factoryToken: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    initChain: '',
    nodeRpc: ETH_MAINNET,
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    lookBlock: ETH_MAIN_EXPLORER + '/block/',
    explorer: ETH_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Ethereum',
    type: 'main',
    label: ETH_MAIN_CHAINID,
    isSwitch: 0,
    suffix: 'ERC20'
  },
  [ETH_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + ETH_TEST_CHAINID,
    tokenList: formatSwapTokenList(symbol, testTokenList),
    bridgeTokenList: formatBridgeTokenList(testTokenList),
    bridgeInitToken: '0xb09bad01684f6d47fc7dc9591889cc77eaed8d22',
    bridgeToken: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    router: '',
    initToken: '0xb09bad01684f6d47fc7dc9591889cc77eaed8d22',
    multicalToken: '0x2fd94457b707b2776d4f4e4292a4280164fe8a15',
    factoryToken: '',
    bridgeRouterToken: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    timelock: '',
    initChain: '97',
    nodeRpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    lookBlock: ETH_TEST_EXPLORER + '/block/',
    explorer: ETH_TEST_EXPLORER,
    symbol: symbol,
    name: 'Ethereum',
    type: 'test',
    label: ETH_TEST_CHAINID,
    isSwitch: 0,
    suffix: 'ERC20'
  },
}