interface ConFig {
  [key: string]: any
}

let netConfig:ConFig = {
  name: 'Huobi',
  symbol: 'HT',
  nodeRpc: 'https://http-testnet.hecochain.com',
  chainID: 256,
  tokenListUrl: 'http://127.0.0.1:8106/tokenList'
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