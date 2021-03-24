import { TokenAmount, Pair, Currency } from '@uniswap/sdk'
// import { useEffect, useMemo, useState } from 'react'
// import { useCallback, useMemo, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'
// import v2Factory from '../constants/abis/v2_factory.json'
// import { useMultipleContractSingleData, useSingleContractMultipleData } from '../state/multicall/hooks'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

// import {useV2FactoryContract} from '../hooks/useContract'

// import { getPairAddress } from '../utils/tools/getPairAddress'
// import {usePairAddress} from '../hooks/getPairAddress'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)
// const PAIR_INTERFACE2 = new Interface(v2Factory)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}
// let onlyOne:any = []
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
  
  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )
  
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  console.log(tokens)
  console.log(pairAddresses)
  return useMemo(() => {
    return results.map((result, i) => {
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
  // console.log(usePairs([[tokenA, tokenB]])[0])
  // return usePairs2([[tokenA, tokenB]])[0]
  return usePairs([[tokenA, tokenB]])[0]
}
