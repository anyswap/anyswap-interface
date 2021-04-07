import { Currency, CurrencyAmount, currencyEquals, ETHER, Token } from 'anyswap-sdk'
import React, { CSSProperties, useMemo } from 'react'
// import { FixedSizeList } from 'react-window'
// import { useTranslation } from 'react-i18next' 
import { Text } from 'rebass'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useLocalToken } from '../../hooks/Tokens'
// import { useSelectedTokenList, WrappedTokenInfo } from '../../state/lists/hooks'
import { WrappedTokenInfo } from '../../state/lists/hooks'
// import { useAddUserToken, useRemoveUserAddedToken } from '../../state/user/hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
// import { LinkStyledButton, TYPE } from '../../theme'
// import { useIsUserAddedToken } from '../../hooks/Tokens'
import Column from '../../components/Column'
import { RowFixed } from '../../components/Row'
import TokenLogo from '../../components/TokenLogo'
import { MouseoverTooltip } from '../../components/Tooltip'
// import { FadedSpan, MenuItem } from '../../components/SearchModal/styleds'
import { MenuItem } from '../../components/SearchModal/styleds'
import Loader from '../../components/Loader'
// import { isTokenOnList } from '../../utils'

import config from '../../config'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const Tag = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`

const ListBox = styled.div`
  overflow:auto;
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function TokenTags({ currency }: { currency: Currency }) {
  if (!(currency instanceof WrappedTokenInfo)) {
    return <span />
  }

  const tags = currency.tags
  if (!tags || tags.length === 0) return <span />

  const tag = tags[0]
  // console.log(tag)
  return (
    <TagContainer>
      <MouseoverTooltip text={tag.description}>
        <Tag key={tag.id + Math.random()}>{tag.name}</Tag>
      </MouseoverTooltip>
      {tags.length > 1 ? (
        <MouseoverTooltip
          text={tags
            .slice(1)
            .map(({ name, description }) => `${name}: ${description}`)
            .join('; \n')}
        >
          <Tag>...</Tag>
        </MouseoverTooltip>
      ) : null}
    </TagContainer>
  )
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  // const { account, chainId } = useActiveWeb3React()
  const { account } = useActiveWeb3React()
  // const { t } = useTranslation()
  const key = currencyKey(currency)
  // const selectedTokenList = useSelectedTokenList()
  // const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  // const customAdded = useIsUserAddedToken(currency)
  // console.log(currency)
  const currencyObj = {
    address: currency.underlying ? currency.underlying.address : currency?.address,
    decimals: currency.decimals,
    symbol: currency.underlying ? currency.underlying.symbol : currency.symbol,
    name: currency.name ? currency.underlying.name : currency.name,
  }
  const currencies = useLocalToken(currencyObj)
  const balance = useCurrencyBalance(account ?? undefined, currencies ?? undefined)

  // const removeToken = useRemoveUserAddedToken()
  // const addToken = useAddUserToken()
  // console.log(selectedTokenList)
  // console.log(key)
  // console.log(Math.random())
  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <TokenLogo symbol={currencyObj.symbol} size={'24px'}></TokenLogo>
      <Column>
        <Text title={currencyObj.name} fontWeight={500}>
          {config.getBaseCoin(currencyObj.symbol)}
        </Text>
        {/* <FadedSpan>
          {!isOnSelectedList && customAdded && !currency?.isCrossChain ? (
            <TYPE.main fontWeight={500}>
              Added by user
              <LinkStyledButton
                onClick={event => {
                  event.stopPropagation()
                  if (chainId && currency instanceof Token) removeToken(chainId, currency.address)
                }}
              >
                ({t('Remove')})
              </LinkStyledButton>
            </TYPE.main>
          ) : null}
          {!isOnSelectedList && !customAdded && !currency?.isCrossChain ? (
            <TYPE.main fontWeight={500}>
              Found by address
              <LinkStyledButton
                onClick={event => {
                  event.stopPropagation()
                  if (currency instanceof Token) addToken(currency)
                }}
              >
                ({t('Add')})
              </LinkStyledButton>
            </TYPE.main>
          ) : null}
        </FadedSpan> */}
      </Column>
      <TokenTags currency={currencyObj} />
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuItem>
  )
}

export default function BridgeCurrencyList({
  height,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  // fixedListRef,
  showETH
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  // fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showETH: boolean
}) {
  const itemData = useMemo(() => (showETH ? [Currency.ETHER, ...currencies] : currencies), [currencies, showETH])
  
  return (
    <>
      <ListBox style={{height: height}}>
        {
          itemData.map((item, index) => {
            const currency: Currency = item
            const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
            const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
            const handleSelect = () => onCurrencySelect(currency)
            // console.log(currency)
            return (
              <CurrencyRow
                style={{margin:'auto'}}
                currency={currency}
                isSelected={isSelected}
                onSelect={handleSelect}
                otherSelected={otherSelected}
                key={index}
              />
            )
          })
        }
      </ListBox>
    </>
  )
}
