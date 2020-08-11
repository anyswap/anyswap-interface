import React, { useCallback, useMemo, useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from 'rebass'
import { DEFAULT_TOKEN_LIST_URL } from '../../constants'
import { AppDispatch, AppState } from '../../state'
import { addList, removeList, selectList } from '../../state/lists/actions'
import { useSelectedListUrl } from '../../state/lists/hooks'
import { CloseIcon, TYPE } from '../../theme'
import { getTokenList } from '../../utils/getTokenList'
import listVersionLabel from '../../utils/listVersionLabel'
import uriToHttp from '../../utils/uriToHttp'
import { ButtonPrimary, ButtonSecondary } from '../Button'
import Column from '../Column'
import Row, { RowBetween } from '../Row'
import { PaddedColumn, SearchInput, Separator } from './styleds'

export function ListSelect({ onDismiss, onBack }: { onDismiss: () => void; onBack: () => void }) {
  const [listUrlInput, setListUrlInput] = useState<string>('')
  const [{ adding, addError }, setAddState] = useState<{ adding: boolean; addError: string | null }>({
    adding: false,
    addError: null
  })
  const handleInput = useCallback(e => {
    setListUrlInput(e.target.value)
  }, [])
  const dispatch = useDispatch<AppDispatch>()

  const handleAddList = useCallback(() => {
    setAddState({ adding: true, addError: null })
    getTokenList(listUrlInput)
      .then(() => {
        dispatch(addList(listUrlInput))
      })
      .then(() => {
        setAddState({ adding: false, addError: null })
        setListUrlInput('')
      })
      .catch(error => {
        setAddState({ adding: false, addError: error.message })
      })
  }, [dispatch, listUrlInput])

  const selectedListUrl = useSelectedListUrl()
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl)

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0
  }, [listUrlInput])

  const handleEnterKey = useCallback(
    e => {
      if (e.key === 'Enter') {
        handleAddList()
      }
    },
    [handleAddList]
  )

  return (
    <Column style={{ width: '100%', flex: '1 1' }}>
      <PaddedColumn gap="14px">
        <RowBetween>
          <div>
            <ArrowLeft style={{ cursor: 'pointer' }} onClick={onBack} />
          </div>
          <Text fontWeight={500} fontSize={16}>
            Manage Lists
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>

        <Separator />

        <Row>
          <SearchInput
            type="text"
            id="list-add-input"
            placeholder="ipfs:// or https://"
            value={listUrlInput}
            onChange={handleInput}
            onKeyDown={handleEnterKey}
          />
          <ButtonPrimary
            style={{ maxWidth: '4rem', marginLeft: '1rem' }}
            onClick={handleAddList}
            disabled={adding || !validUrl}
          >
            Add
          </ButtonPrimary>
        </Row>
        {addError ? (
          <TYPE.error title={addError} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} error>
            {addError}
          </TYPE.error>
        ) : null}
      </PaddedColumn>

      <Separator />

      <div style={{ flex: '1', padding: '1rem' }}>
        {Object.keys(lists).map(listUrl => {
          const { current: list } = lists[listUrl]

          const isSelected = listUrl === selectedListUrl

          return (
            <div key={listUrl}>
              <div title={listUrl}>{list?.name ?? listUrl}</div>
              <div>{list?.version && listVersionLabel(list?.version)}</div>
              <Row>
                <ButtonSecondary
                  onClick={() => {
                    !isSelected && dispatch(selectList(listUrl))
                  }}
                  disabled={isSelected}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </ButtonSecondary>
                <ButtonSecondary
                  onClick={() => {
                    dispatch(removeList(listUrl))
                  }}
                  disabled={listUrl === DEFAULT_TOKEN_LIST_URL}
                >
                  Remove
                </ButtonSecondary>
              </Row>
            </div>
          )
        })}
      </div>
    </Column>
  )
}