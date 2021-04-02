import { Currency, ETHER, Token } from 'anyswap-sdk'
import config from '../config'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return config.symbol
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
