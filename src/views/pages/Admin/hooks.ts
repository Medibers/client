import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import Requests, { endPoints } from 'requests'

import Routes from 'routes'

import { ISupplier, ISupplierItem } from './types'

export const useGetSuppliers = (): [boolean, ISupplier[]] => {
  const [fetching, setFetching] = useState(true)
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])

  const { pathname: locationPath } = useLocation()

  useEffect(() => {
    locationPath === Routes.suppliers.path &&
      Requests.get<ISupplier[]>(endPoints.suppliers)
        .then(data => setSuppliers(data.reverse()))
        .finally(() => setFetching(false))
  }, [locationPath])

  return [fetching, suppliers]
}

export const useGetSupplierItems = (
  supplierId: string
): [boolean, ISupplierItem[]] => {
  const [fetching, setFetching] = useState(Boolean(supplierId))
  const [suppliers, setSuppliers] = useState<ISupplierItem[]>([])

  const { pathname: locationPath } = useLocation()

  useEffect(() => {
    locationPath === Routes.supplier.path &&
      supplierId &&
      Requests.get<ISupplierItem[]>(
        endPoints.supplierItems(supplierId) + '?returnPricesRaw=true'
      )
        .then(data => setSuppliers(data.reverse()))
        .finally(() => setFetching(false))
  }, [supplierId, locationPath])

  return [fetching, suppliers]
}
