interface ConFig {
  [key: string]: any
}
let explorerUrl = 'https://scan-testnet.hecochain.com'
let netConfig:ConFig = {
  oldAppName: 'Anyswap V1',
  appName: 'Anyswap V2',
  name: 'Huobi',
  symbol: 'HT',
  baseCurrency: 'ANY',
  nodeRpc: 'https://http-testnet.hecochain.com',
  chainID: 256,
  tokenListUrl: 'http://192.168.50.229:8106/tokenList',
  // router: '0x2721b8e2A0f0939a289d4379e85fFf59F9226420',
  router: '0xec00a74ff12a4c7cadc4596bd0278eafaebcc59d',
  lookHash: explorerUrl + '/tx/',
  lookAddr: explorerUrl + '/address/',
  lookBlock: explorerUrl + '/block/',
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