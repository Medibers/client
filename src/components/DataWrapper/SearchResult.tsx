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
}

interface IRouteMatch {
  id: string
}

const mapStateToProps = (state: ReducerState) => ({
  result: state.App.searchResult,
})

const SearchResultDataWrapper = (
  Component: React.FC<IComponent>,
  routeKey: string
) =>
  connect(mapStateToProps)((({ result: storeResult }) => {
    const { id } = useGetRouteParams<IRouteMatch>(Routes[routeKey].path)

    const [, data] = useGetSearchResult(storeResult ? undefined : id)

    const result = storeResult || (data as ItemSearchResult)

    return result ? <Component result={result} /> : null
  }) as React.FC<Partial<IComponent>>)

export default SearchResultDataWrapper
