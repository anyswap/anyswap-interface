import bscmain from '../tokens/bscmain'
import ftmmain from '../tokens/ftmmain'
import httest from '../tokens/httest'
import htmain from '../tokens/htmain'
import maticmain from '../tokens/maticmain'
import xdaimain from '../tokens/xdaimain'

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

// export const OKT_TESTNET = 'http://13.230.73.12:8545'
export const OKT_TESTNET = 'https://oktestrpc.anayswap.exchange'
export const OKT_TEST_CHAINID = 2
export const OKT_TEST_EXPLORER = 'https://scan-testnet.hecochain.com'


export const ARBITRUM_TESTNET = 'https://kovan4.arbitrum.io/rpc'
export const ARBITRUM_TEST_CHAINID = 212984383488152
export const ARBITRUM_TEST_EXPLORER = 'https://explorer.arbitrum.io/#/'

export const MATIC_MAINNET = 'https://rpc-mainnet.maticvigil.com'
export const MATIC_MAIN_CHAINID = 137
export const MATIC_MAIN_EXPLORER = 'https://explorer-mainnet.maticvigil.com'

export const XDAI_MAINNET = 'https://rpc.xdaichain.com'
export const XDAI_MAIN_CHAINID = 100
export const XDAI_MAIN_EXPLORER = 'https://blockscout.com/xdai/mainnet'

export const AVAX_MAINNET = 'https://api.avax.network/ext/bc/C/rpc'
export const AVAX_MAIN_CHAINID = 43114
export const AVAX_MAIN_EXPLORER = 'https://cchain.explorer.avax.network/'

interface ChainInfo {
  [key: string]: any
}

export const chainInfo: ChainInfo = {
  [AVAX_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + AVAX_MAIN_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: AVAX_MAINNET,
    chainID: AVAX_MAIN_CHAINID,
    lookHash: AVAX_MAIN_EXPLORER + '/tx/',
    lookAddr: AVAX_MAIN_EXPLORER + '/address/',
    lookBlock: AVAX_MAIN_EXPLORER + '/block/',
    explorer: AVAX_MAIN_EXPLORER,
    symbol: 'AVAX',
    name: 'Avalanche',
    type: 'main',
    label: AVAX_MAIN_CHAINID,
    isSwitch: 1
  },
  [XDAI_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + XDAI_MAIN_CHAINID,
    tokenList: xdaimain,
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    initToken: '',
    multicalToken: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    bridgeToken: '',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: XDAI_MAINNET,
    chainID: XDAI_MAIN_CHAINID,
    lookHash: XDAI_MAIN_EXPLORER + '/tx/',
    lookAddr: XDAI_MAIN_EXPLORER + '/address/',
    lookBlock: XDAI_MAIN_EXPLORER + '/block/',
    explorer: XDAI_MAIN_EXPLORER,
    symbol: 'xDAI',
    name: 'xDAI',
    type: 'main',
    label: XDAI_MAIN_CHAINID,
    isSwitch: 1
  },
  [MATIC_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + MATIC_MAIN_CHAINID,
    tokenList: maticmain,
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    initToken: '',
    multicalToken: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    bridgeToken: '',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: MATIC_MAINNET,
    chainID: MATIC_MAIN_CHAINID,
    lookHash: MATIC_MAIN_EXPLORER + '/tx/',
    lookAddr: MATIC_MAIN_EXPLORER + '/address/',
    lookBlock: MATIC_MAIN_EXPLORER + '/block/',
    explorer: MATIC_MAIN_EXPLORER,
    symbol: 'MATIC',
    name: 'Polygon',
    type: 'main',
    label: MATIC_MAIN_CHAINID,
    isSwitch: 1
  },
  [ARBITRUM_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + ARBITRUM_TEST_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: ARBITRUM_TESTNET,
    chainID: ARBITRUM_TEST_CHAINID,
    lookHash: ARBITRUM_TEST_EXPLORER + '/tx/',
    lookAddr: ARBITRUM_TEST_EXPLORER + '/address/',
    lookBlock: ARBITRUM_TEST_EXPLORER + '/block/',
    explorer: ARBITRUM_TEST_EXPLORER,
    symbol: 'ARBITRUM',
    name: 'Arbitrum',
    type: 'main',
    label: ARBITRUM_TEST_CHAINID,
    isSwitch: 1
  },
  [OKT_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + OKT_TEST_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: OKT_TESTNET,
    chainID: OKT_TEST_CHAINID,
    lookHash: OKT_TEST_EXPLORER + '/tx/',
    lookAddr: OKT_TEST_EXPLORER + '/address/',
    lookBlock: OKT_TEST_EXPLORER + '/block/',
    explorer: OKT_TEST_EXPLORER,
    symbol: 'OKT',
    name: 'OKT',
    type: 'main',
    label: OKT_TEST_CHAINID,
    isSwitch: 1
  },
  [ETH_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + ETH_MAIN_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: ETH_MAINNET,
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    lookBlock: ETH_MAIN_EXPLORER + '/block/',
    explorer: ETH_MAIN_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'main',
    label: ETH_MAIN_CHAINID,
    isSwitch: 0
  },
  [ETH_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + ETH_TEST_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    lookBlock: ETH_TEST_EXPLORER + '/block/',
    explorer: ETH_TEST_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'test',
    label: ETH_TEST_CHAINID,
    isSwitch: 0
  },
  [BNB_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + BNB_MAIN_CHAINID,
    tokenList: bscmain,
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    initToken: '',
    multicalToken: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    bridgeToken: '',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: BNB_MAINNET,
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    lookBlock: BNB_MAIN_EXPLORER + '/block/',
    explorer: BNB_MAIN_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'main',
    label: BNB_MAIN_CHAINID,
    isSwitch: 1
  },
  [BNB_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + BNB_TEST_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    lookBlock: BNB_TEST_EXPLORER + '/block/',
    explorer: BNB_TEST_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'test',
    label: BNB_TEST_CHAINID,
    isSwitch: 1
  },
  [HT_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + HT_MAIN_CHAINID,
    tokenList: htmain,
    router: '0x479ab92bf721de918f01d455e90540149dbfd9da',
    initToken: '0x3b2c595173831bc4ceea2406fe49577bdb95d90a',
    multicalToken: '0xe4ea48020f648b1aa7fc25af7b196596190c6b29',
    factoryToken: '0xed776e576809012fb43382b37f576efbe3ab3390',
    bridgeToken: '',
    timelock: '',
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
    tokenListUrl: 'https://list.htswap.io/tokenList/' + HT_TEST_CHAINID,
    tokenList: httest,
    router: '0x77e0e26de17be1ea2df87269475431e0e17dc74f',
    initToken: '0x734922e7b793b408cd434eedaa407c9c0c575d1e',
    multicalToken: '0xbff74da37df72695b1d7e8185edd47fd0771ee3a',
    factoryToken: '0x2302c14f2928bb9b68053320309b84db3702f89f',
    bridgeToken: '',
    timelock: '',
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
    tokenListUrl: 'https://list.htswap.io/tokenList/' + FTM_MAIN_CHAINID,
    tokenList: ftmmain,
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    initToken: '0xf99d58e463a2e07e5692127302c20a191861b4d6',
    multicalToken: '0xe94B5EEC1fA96CEecbD33EF5Baa8d00E4493F4f3',
    factoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    bridgeToken: '',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: FTM_MAINNET,
    chainID: FTM_MAIN_CHAINID,
    lookHash: FTM_MAIN_EXPLORER + '/transactions/',
    lookAddr: FTM_MAIN_EXPLORER + '/address/',
    lookBlock: FTM_MAIN_EXPLORER + '/block/',
    explorer: FTM_MAIN_EXPLORER,
    symbol: 'FTM',
    name: 'Fantom',
    type: 'main',
    label: FTM_MAIN_CHAINID,
    isSwitch: 0
  },
  [FSN_MAIN_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + FSN_MAIN_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
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
    label: FSN_MAIN_CHAINID,
    isSwitch: 1
  },
  [FSN_TEST_CHAINID]: {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    baseCurrency: 'ANY',
    tokenListUrl: 'https://list.htswap.io/tokenList/' + FSN_TEST_CHAINID,
    tokenList: '',
    router: '',
    initToken: '',
    multicalToken: '',
    factoryToken: '',
    bridgeToken: '',
    timelock: '',
    nodeRpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    lookHash: FSN_TEST_EXPLORER + '/transaction/',
    lookAddr: FSN_TEST_EXPLORER + '/address/',
    lookBlock: FSN_TEST_EXPLORER + '/block/',
    explorer: FSN_TEST_EXPLORER,
    symbol: 'FSN',
    name: 'Fusion',
    type: 'test',
    label: FSN_TEST_CHAINID,
    isSwitch: 1
  }
}

export const chainList = {
  main: [chainInfo[FSN_MAIN_CHAINID], chainInfo[BNB_MAIN_CHAINID], chainInfo[FTM_MAIN_CHAINID], chainInfo[ETH_MAIN_CHAINID]],
  test: [chainInfo[FSN_TEST_CHAINID], chainInfo[BNB_TEST_CHAINID]]
}

