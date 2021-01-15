import { Currency } from '@uniswap/sdk'
import React from 'react'
import styled from 'styled-components'
import TokenLogo from '../TokenLogo'

const Wrapper = styled.div<{ margin: boolean; sizeraw: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`

interface DoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  currency0?: Currency
  currency1?: Currency
}

const HigherLogo = styled(TokenLogo)`
  z-index: 2;
`
const CoveredLogo = styled(TokenLogo)<{ sizeraw: number }>`
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw * 2 / 3).toString() + 'px'} !important;
`

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 16,
  margin = false
}: DoubleCurrencyLogoProps) {
  return (
    <Wrapper sizeraw={size} margin={margin}>
      {currency0 && <HigherLogo symbol={currency0?.symbol} size={size.toString() + 'px'} />}
      {currency1 && <CoveredLogo symbol={currency1?.symbol} size={size.toString() + 'px'} sizeraw={size} />}
    </Wrapper>
  )
}
