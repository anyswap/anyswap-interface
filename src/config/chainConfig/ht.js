import {formatSwapTokenList, formatBridgeTokenList} from './methods'
import {tokenListUrl} from '../constant'

export const HT_MAINNET = 'https://http-mainnet.hecochain.com'
export const HT_MAIN_CHAINID = 128
export const HT_MAIN_EXPLORER = 'https://scan.hecochain.com'

export const HT_TESTNET = 'https://http-testnet.hecochain.com'
export const HT_TEST_CHAINID = 256
export const HT_TEST_EXPLORER = 'https://testnet.hecoinfo.com'

export const tokenList = [
  {
    "address": "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HBTC",
    "symbol": "HBTC"
  },
  {
    "address": "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg ETH",
    "symbol": "HETH"
  },
  {
    "address": "0x0298c2b32eae4da002a15f36fdf7615bea3da047",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 8,
    "name": "Heco-Peg HUSD",
    "symbol": "HUSD"
  },
  {
    "address": "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HLTC",
    "symbol": "HLTC"
  },
  {
    "address": "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HFIL",
    "symbol": "HFIL"
  },
  {
    "address": "0xef3cebd77e0c52cb6f60875d9306397b5caca375",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HBCH",
    "symbol": "HBCH"
  },
  {
    "address": "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HDOT",
    "symbol": "HDOT"
  },
  {
    "address": "0xc2cb6b5357ccce1b99cd22232942d9a225ea4eb1",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HBSV",
    "symbol": "HBSV"
  },
  {
    "address": "0x45e97dad828ad735af1df0473fc2735f0fd5330c",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HXTZ",
    "symbol": "HXTZ"
  },
  {
    "address": "0x734922e7b793b408cd434eedaa407c9c0c575d1e",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "HTCToken",
    "symbol": "HTC"
  },
  {
    "address": "0xe499ef4616993730ced0f31fa2703b92b50bb536",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg HPT",
    "symbol": "HPT"
  },
  {
    "address": "0xa71edc38d189767582c38a3145b5873052c3e47a",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "Heco-Peg USDTHECO",
    "symbol": "USDT"
  },
  {
    "address": "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
    "chainId": HT_MAIN_CHAINID,
    "decimals": 18,
    "name": "WHT",
    "symbol": "WHT"
  }
]

export const testTokenList = [
  {
    "address": "0x4373ca233c17b8bf1bf8159d56019d3394a0670d",
    "chainId": HT_TEST_CHAINID,
    "decimals": 18,
    "name": "ANY",
    "symbol": "ANY"
  },
  {
    "address": "0x3b2c595173831bc4ceea2406fe49577bdb95d90a",
    "chainId": HT_TEST_CHAINID,
    "decimals": 18,
    "name": "HTC",
    "symbol": "HTC"
  },
  {
    "address": "0xa5a3c93776ba2e1a78c79e88a2cb5abab2a0097f",
    "chainId": HT_TEST_CHAINID,
    "decimals": 18,
    "name": "WETH",
    "symbol": "WETH"
  },
  {
    "address": "0x130966628846bfd36ff31a822705796e8cb8c18d",
    "chainId": HT_TEST_CHAINID,
    "decimals": 6,
    "name": "aaa",
    "symbol": "AAA",
    "isUnderlying": 0,
    "isCrossChain": 1
  }
]

const symbol = 'HT'

export default {
  [HT_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + HT_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    bridgeTokenList: formatBridgeTokenList(tokenList),
    bridgeInitToken: '',
    bridgeRouterToken: '',
    router: '0x77e0e26de17be1ea2df87269475431e0e17dc74f',
    initToken: '0x734922e7b793b408cd434eedaa407c9c0c575d1e',
    multicalToken: '0xbff74da37df72695b1d7e8185edd47fd0771ee3a',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    timelock: '',
    initChain: '',
    nodeRpc: HT_MAINNET,
    chainID: HT_MAIN_CHAINID,
    lookHash: HT_MAIN_EXPLORER + '/tx/',
    lookAddr: HT_MAIN_EXPLORER + '/address/',
    lookBlock: HT_MAIN_EXPLORER + '/block/',
    explorer: HT_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Huobi',
    type: 'main',
    label: HT_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'HECO'
  },
  [HT_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: tokenListUrl + HT_TEST_CHAINID,
    tokenList: formatSwapTokenList(symbol, testTokenList),
    bridgeTokenList: formatBridgeTokenList(testTokenList),
    bridgeInitToken: '0x130966628846bfd36ff31a822705796e8cb8c18d',
    bridgeRouterToken: '0xcb58418aa51ba525aef0fe474109c0354d844b7c',
    router: '0x479ab92bf721de918f01d455e90540149dbfd9da',
    initToken: '0x734922e7b793b408cd434eedaa407c9c0c575d1e',
    multicalToken: '0xe4ea48020f648b1aa7fc25af7b196596190c6b29',
    factoryToken: '0x2302c14f2928bb9b68053320309b84db3702f89f',
    timelock: '',
    initChain: '97',
    nodeRpc: HT_TESTNET,
    chainID: HT_TEST_CHAINID,
    lookHash: HT_TEST_EXPLORER + '/tx/',
    lookAddr: HT_TEST_EXPLORER + '/address/',
    lookBlock: HT_TEST_EXPLORER + '/block/',
    explorer: HT_TEST_EXPLORER,
    symbol: symbol,
    name: 'Huobi',
    type: 'test',
    label: HT_TEST_CHAINID,
    isSwitch: 1,
    suffix: 'HECO'
  },
}