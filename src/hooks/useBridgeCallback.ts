import { Currency } from '@uniswap/sdk'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useActiveWeb3React } from './index'
import { useBridgeContract } from './useContract'

import config from '../config'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
export default function useBridgeCallback(
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  toAddress:  string | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract()
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    // console.log(typedValue)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                console.log(bridgeContract)
                // console.log(inputAmount.raw.toString(16))
                const txReceipt = await bridgeContract.anySwapOut(
                  inputToken,
                  toAddress,
                  `0x${inputAmount.raw.toString(16)}`,
                  toChainID
                )
                addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ${config.symbol} to W${config.symbol}` })
              } catch (error) {
                console.error('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: config.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t])
}
