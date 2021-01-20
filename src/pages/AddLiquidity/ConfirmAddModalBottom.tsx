import { Currency, CurrencyAmount, Fraction, Percent } from '@uniswap/sdk'
import React from 'react'
import { Text } from 'rebass'
import { useTranslation } from 'react-i18next'
import { ButtonPrimary } from '../../components/Button'
import { RowBetween, RowFixed } from '../../components/Row'
import TokenLogo from '../../components/TokenLogo'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

import config from '../../config'

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <TYPE.body>{config.getBaseCoin(currencies[Field.CURRENCY_A]?.symbol)} {t('Deposited')}</TYPE.body>
        <RowFixed>
          <TokenLogo symbol={config.getBaseCoin(currencies[Field.CURRENCY_A]?.symbol)} style={{ marginRight: '8px' }}></TokenLogo>
          <TYPE.body>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body>{config.getBaseCoin(currencies[Field.CURRENCY_B]?.symbol)} {t('Deposited')}</TYPE.body>
        <RowFixed>
          <TokenLogo symbol={config.getBaseCoin(currencies[Field.CURRENCY_B]?.symbol)} style={{ marginRight: '8px' }}></TokenLogo>
          <TYPE.body>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body>{t('Rates')}</TYPE.body>
        <TYPE.body>
          {`1 ${config.getBaseCoin(currencies[Field.CURRENCY_A]?.symbol)} = ${price?.toSignificant(4)} ${
            config.getBaseCoin(currencies[Field.CURRENCY_B]?.symbol)
          }`}
        </TYPE.body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <TYPE.body>
          {`1 ${config.getBaseCoin(currencies[Field.CURRENCY_B]?.symbol)} = ${price?.invert().toSignificant(4)} ${
            config.getBaseCoin(currencies[Field.CURRENCY_A]?.symbol)
          }`}
        </TYPE.body>
      </RowBetween>
      <RowBetween>
        <TYPE.body>{t('ShareOfPool')}:</TYPE.body>
        <TYPE.body>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</TYPE.body>
      </RowBetween>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <Text fontWeight={500} fontSize={20}>
          {noLiquidity ? t('CreatePoolSupply') : t('ConfirmSupply')}
        </Text>
      </ButtonPrimary>
    </>
  )
}
