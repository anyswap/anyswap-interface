interface ConFig {
  [key: string]: any
}

let netConfig:ConFig = {
  name: 'Huobi',
  symbol: 'HT'
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