interface ConFig {
  [key: string]: any
}

let netConfig:ConFig = {
  name: 'Huobi',
  symbol: 'HT',
  nodeRpc: 'https://http-testnet.hecochain.com',
  chainID: 256,
  tokenListUrl: 'http://192.168.50.229:8106/tokenList',
  router: '0x2721b8e2A0f0939a289d4379e85fFf59F9226420'
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
    } else {
      return value
    }
  }
}
export default config