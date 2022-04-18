/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { useGetRouteParams } from 'app-history'
import { useGetSearchResult } from 'requests'
import { ItemSearchResult } from 'types'

import Routes from 'routes'

interface IComponent {
  result: ItemSearchResult
  selectedItems: Array<ItemSearchResult>
}

interface IRouteMatch {
  id: string
}

const SearchResultDataWrapper = (
  Component: React.FC<IComponent>,
  routeKey: string
) => {
  const mapStateToProps = (state: ReducerState) => ({
    result: state.App.searchResult,
    selectedItems: state.App.cart,
  })

  return connect(mapStateToProps)((({ result: storeResult, selectedItems }) => {
    const { id } = useGetRouteParams<IRouteMatch>(Routes[routeKey].path)

    const [, data] = useGetSearchResult(storeResult ? undefined : id)

    const result = storeResult || (data as ItemSearchResult)

    return result ? (
      <Component result={result} selectedItems={selectedItems || []} />
    ) : null
  }) as React.FC<Partial<IComponent>>)
}

export default SearchResultDataWrapper
