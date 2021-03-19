import httest from '../tokens/httest.json'
import htmain from '../tokens/htmain.json'

const navLang = navigator.language

export const BNB_MAINNET = 'https://bsc-dataseed1.binance.org/'
export const BNB_MAIN_CHAINID = 56
export const BNB_MAIN_EXPLORER = 'https://bscscan.com'

export const BNB_TESTNET = 'https://data-seed-prebsc-1-s1.binance.org:8545'
export const BNB_TEST_CHAINID = 97
export const BNB_TEST_EXPLORER = 'https://explorer.binance.org/smart-testnet'

// export const FSN_MAINNET = 'https://fsnmainnet2.anyswap.exchange'
export const FSN_MAINNET = 'https://mainnet.anyswap.exchange'
export const FSN_MAINNET1 = 'https://mainnet.anyswap.exchange'
export const FSN_MAIN_CHAINID = 32659
export const FSN_MAIN_EXPLORER = 'https://fsnex.com'

// export const FSN_TESTNET = 'https://testnet.anyswap.exchange'
export const FSN_TESTNET = 'https://testnet.fsn.dev/api'
export const FSN_TEST_CHAINID = 46688
export const FSN_TEST_EXPLORER = 'https://fsnex.com'

export const ETH_MAINNET = 'https://ethmainnet.anyswap.exchange'
// export const ETH_MAINNET = 'https://mainnet.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
export const ETH_MAIN_CHAINID = 1
export const ETH_MAIN_EXPLORER = navLang === 'zh-CN' ? 'https://cn.etherscan.com' : 'https://etherscan.io'

export const ETH_TESTNET = 'https://rinkeby.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
export const ETH_TEST_CHAINID = 4
export const ETH_TEST_EXPLORER = 'https://rinkeby.etherscan.io'

export const FTM_MAINNET = 'https://rpc.fantom.network'
export const FTM_MAIN_CHAINID = 250
export const FTM_MAIN_EXPLORER = 'https://explorer.fantom.network'

export const HT_MAINNET = 'https://http-mainnet.hecochain.com'
export const HT_MAIN_CHAINID = 128
export const HT_MAIN_EXPLORER = 'https://scan.hecochain.com'

export const HT_TESTNET = 'https://http-testnet.hecochain.com'
export const HT_TEST_CHAINID = 256
export const HT_TEST_EXPLORER = 'https://scan-testnet.hecochain.com'

interface ChainInfo {
  [key: string]: any
}

export const chainInfo: ChainInfo = {
  [ETH_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: ETH_MAINNET,
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    lookBlock: ETH_MAIN_EXPLORER + '/block/',
    explorer: ETH_MAIN_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'main',
    label: 'ETH_MAIN',
    isSwitch: 0
  },
  [ETH_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    lookBlock: ETH_TEST_EXPLORER + '/block/',
    explorer: ETH_TEST_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'test',
    label: 'ETH_TEST',
    isSwitch: 0
  },
  [BNB_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: BNB_MAINNET,
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    lookBlock: BNB_MAIN_EXPLORER + '/block/',
    explorer: BNB_MAIN_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'main',
    label: 'BNB_MAIN',
    isSwitch: 1
  },
  [BNB_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    lookBlock: BNB_TEST_EXPLORER + '/block/',
    explorer: BNB_TEST_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'test',
    label: 'BNB_TEST',
    isSwitch: 1
  },
  [HT_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '0x479ab92bf721de918f01d455e90540149dbfd9da',
    tokenList: htmain,
    initToken: '0x3b2c595173831bc4ceea2406fe49577bdb95d90a',
    multicalToken: '0xe4ea48020f648b1aa7fc25af7b196596190c6b29',
    nodeRpc: HT_MAINNET,
    chainID: HT_MAIN_CHAINID,
    lookHash: HT_MAIN_EXPLORER + '/tx/',
    lookAddr: HT_MAIN_EXPLORER + '/address/',
    lookBlock: HT_MAIN_EXPLORER + '/block/',
    explorer: HT_MAIN_EXPLORER,
    symbol: 'HT',
    name: 'Huobi',
    type: 'main',
    label: HT_MAIN_CHAINID,
    isSwitch: 1
  },
  [HT_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '0x77e0e26de17be1ea2df87269475431e0e17dc74f',
    tokenList: httest,
    initToken: '0x734922e7b793b408cd434eedaa407c9c0c575d1e',
    multicalToken: '0xbff74da37df72695b1d7e8185edd47fd0771ee3a',
    nodeRpc: HT_TESTNET,
    chainID: HT_TEST_CHAINID,
    lookHash: HT_TEST_EXPLORER + '/tx/',
    lookAddr: HT_TEST_EXPLORER + '/address/',
    lookBlock: HT_TEST_EXPLORER + '/block/',
    explorer: HT_TEST_EXPLORER,
    symbol: 'HT',
    name: 'Huobi',
    type: 'test',
    label: HT_TEST_CHAINID,
    isSwitch: 1
  },
  [FTM_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: FTM_MAINNET,
    chainID: FTM_MAIN_CHAINID,
    lookHash: FTM_MAIN_EXPLORER + '/transactions/',
    lookAddr: FTM_MAIN_EXPLORER + '/address/',
    lookBlock: FTM_MAIN_EXPLORER + '/block/',
    explorer: FTM_MAIN_EXPLORER,
    symbol: 'FTM',
    name: 'Fantom',
    type: 'main',
    label: 'FTM_MAIN',
    isSwitch: 0
  },
  [FSN_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: FSN_MAINNET,
    rpc1: FSN_MAINNET1,
    chainID: FSN_MAIN_CHAINID,
    lookHash: FSN_MAIN_EXPLORER + '/transaction/',
    lookAddr: FSN_MAIN_EXPLORER + '/address/',
    lookBlock: FSN_MAIN_EXPLORER + '/block/',
    explorer: FSN_MAIN_EXPLORER,
    symbol: 'FSN',
    name: 'Fusion',
    type: 'main',
    label: 'FSN_MAIN',
    isSwitch: 1
  },
  [FSN_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '',
    tokenList: '',
    initToken: '',
    multicalToken: '',
    nodeRpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    lookHash: FSN_TEST_EXPLORER + '/transaction/',
    lookAddr: FSN_TEST_EXPLORER + '/address/',
    lookBlock: FSN_TEST_EXPLORER + '/block/',
    explorer: FSN_TEST_EXPLORER,
    symbol: 'FSN',
    name: 'Fusion',
    type: 'test',
    label: 'BNB_TEST',
    isSwitch: 1
  }
}

export const chainList = {
  main: [chainInfo[FSN_MAIN_CHAINID], chainInfo[BNB_MAIN_CHAINID], chainInfo[FTM_MAIN_CHAINID], chainInfo[ETH_MAIN_CHAINID]],
  test: [chainInfo[FSN_TEST_CHAINID], chainInfo[BNB_TEST_CHAINID]]
}

