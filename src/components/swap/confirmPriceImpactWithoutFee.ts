import { Percent } from '@uniswap/sdk'
import { useTranslation } from 'react-i18next'
import { ALLOWED_PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN } from '../../constants'

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
export default function confirmPriceImpactWithoutFee(priceImpactWithoutFee: Percent): boolean {
  const { t } = useTranslation()
  if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    return (
      window.prompt(
        t('tip47', {params: PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed( 0 )})
      ) === 'confirm'
    )
  } else if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    return window.confirm(
      t('tip48', {params: ALLOWED_PRICE_IMPACT_HIGH.toFixed( 0 )})
    )
  }
  return true
}
