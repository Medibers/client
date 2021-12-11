/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { useGetRouteParams } from 'app-history'
import { useGetSupplier } from 'requests'

import Routes from 'routes'
import { ISupplier } from 'views/pages/Admin/types'

interface IComponent {
  supplier: ISupplier
}

interface IRouteMatch {
  id: string
}

const mapStateToProps = (state: ReducerState) => ({
  supplier: state.App.supplier,
})

const SupplierDataWrapper = (
  Component: React.FC<IComponent>,
  routeKey: string
) =>
  connect(mapStateToProps)((({ supplier: storeSupplier }) => {
    const { id } = useGetRouteParams<IRouteMatch>(Routes[routeKey].path)

    const [, data] = useGetSupplier(storeSupplier ? undefined : id)

    const supplier = storeSupplier || (data as ISupplier)

    return supplier ? <Component supplier={supplier} /> : null
  }) as React.FC<Partial<IComponent>>)

export default SupplierDataWrapper
