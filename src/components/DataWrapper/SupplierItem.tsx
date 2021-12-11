/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { useGetRouteParams } from 'app-history'
import { useGetSupplierItem } from 'requests'

import Routes from 'routes'
import { ISupplierItem } from 'views/pages/Admin/types'

interface IComponent {
  item: ISupplierItem
}

interface IRouteMatch {
  supplierId: string
  supplierItemId: string
}

const mapStateToProps = (state: ReducerState) => ({
  item: state.App.supplierItem,
})

const SupplierItemDataWrapper = (
  Component: React.FC<IComponent>,
  routeKey: string
) =>
  connect(mapStateToProps)((({ item: storeItem }) => {
    const { supplierId, supplierItemId } = useGetRouteParams<IRouteMatch>(
      Routes[routeKey].path
    )

    const [, data] = useGetSupplierItem(
      storeItem ? undefined : supplierId,
      storeItem ? undefined : supplierItemId
    )

    const item = storeItem || (data as ISupplierItem)

    return item ? <Component item={item} /> : null
  }) as React.FC<Partial<IComponent>>)

export default SupplierItemDataWrapper
