import httest from './tokens/httest.json'
import htmain from './tokens/htmain.json'

interface ConFig {
  [key: string]: any
}

const ENV = 0 ? 'main' : 'test'

let explorerUrl = 'https://scan-testnet.hecochain.com'
let netConfig:ConFig = {
  oldAppName: 'Anyswap V1',
  appName: 'HTswap LP',
  name: 'Huobi',
  symbol: 'HT',
  baseCurrency: 'ANY',
  nodeRpc: 'https://http-testnet.hecochain.com',
  chainID: 256,
  // tokenListUrl: 'http://192.168.50.229:8110/tokenList/256',
  // tokenListUrl: '',
  tokenListUrl: 'https://list.smpcwallet.com/tokenList/256',
  // router: '0x2721b8e2A0f0939a289d4379e85fFf59F9226420',
  router: '0x479ab92bf721de918f01d455e90540149dbfd9da',
  lookHash: explorerUrl + '/tx/',
  lookAddr: explorerUrl + '/address/',
  lookBlock: explorerUrl + '/block/',
  tokenList: httest,
  initToken: '0x3b2c595173831bc4ceea2406fe49577bdb95d90a',
  multicalToken: '0xe4ea48020f648b1aa7fc25af7b196596190c6b29'
}

if (ENV === 'main') {
  explorerUrl = 'https://scan.hecochain.com'
  netConfig = {
    oldAppName: 'Anyswap V1',
    appName: 'HTswap LP',
    name: 'Huobi',
    symbol: 'HT',
    baseCurrency: 'ANY',
    nodeRpc: 'https://http-mainnet-node1.hecochain.com',
    chainID: 128,
    // tokenListUrl: '',
    tokenListUrl: 'https://list.htswap.io/tokenList/128',
    router: '0x77e0e26de17be1ea2df87269475431e0e17dc74f',
    lookHash: explorerUrl + '/tx/',
    lookAddr: explorerUrl + '/address/',
    lookBlock: explorerUrl + '/block/',
    tokenList: htmain,
    initToken: '0x734922e7b793b408cd434eedaa407c9c0c575d1e',
    multicalToken: '0xbff74da37df72695b1d7e8185edd47fd0771ee3a'
  }
}

const config: ConFig = {
  ...netConfig,
  getBaseCoin (value:any, type: number) {
    if (value && value === 'BASECURRENCY') {
      if (type) {
        return netConfig.name
      } else {
        return netConfig.symbol
      }
    } else if (value && value === 'WETH') {
      return 'W' + netConfig.symbol
    } else {
      return value
    }
  }
}
export default config