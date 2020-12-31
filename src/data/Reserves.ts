import { TokenAmount, Pair, Currency } from '@uniswap/sdk'
import { useMemo } from 'react'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

// import {getPairAddress} from '../utils/tools/getPairAddress'
import { usePairAddress } from '../hooks/getPairAddress'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )
  // console.log(tokens)
  const paObj = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        // console.log(tokenA?.address)
        // console.log(tokenB?.address)
        return tokenA && tokenB && !tokenA.equals(tokenB) ? { tokenA, tokenB } : undefined
      }),
    [tokens]
  )
  const pa = usePairAddress(paObj)
  const results = useMultipleContractSingleData(pa, PAIR_INTERFACE, 'getReserves')
  console.log(paObj)
  // console.log(pa)
  // console.log(results)

  // const pairAddresses = useMemo(
  //   () =>
  //     tokens.map(([tokenA, tokenB]) => {
  //       // console.log(tokenA?.address)
  //       // console.log(tokenB?.address)
  //       return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
  //       // return tokenA && tokenB && !tokenA.equals(tokenB) ? pa : undefined
  //     }),
  //   [tokens]
  // )
  // console.log(pairAddresses)
  // const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  // console.log(results)

  return useMemo(() => {
    console.log(tokens)
    console.log(results)
    return results.map((result, i) => {
      // console.log(tokens)
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]
      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
      ]
    })
  }, [results, tokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  console.log(usePairs([[tokenA, tokenB]])[0])
  return usePairs([[tokenA, tokenB]])[0]
}
