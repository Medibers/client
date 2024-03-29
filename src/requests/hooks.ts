import { useEffect, useState } from 'react'

import { useMutation } from 'react-query'

import Requests, { endPoints } from '.'

import {
  setCategories,
  setSearchResult,
  setSupplier,
  setSupplierItem,
} from 'store/utils'
import { ICategory, IUnit, ItemSearchResult } from 'types'
import { ISupplier, ISupplierItem } from 'views/Admin/types'

export const useGetSearchResult = (
  id?: string
): [boolean, ItemSearchResult | undefined] => {
  const { isLoading, data, mutateAsync } = useMutation((id: string) => {
    return Requests.get<ItemSearchResult[]>(endPoints['item-search'](id))
  })

  useEffect(() => {
    id && mutateAsync(id).then(([result]) => setSearchResult(result))
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return [isLoading, data ? data[0] : undefined]
}

export const useGetSupplier = (
  id?: string
): [boolean, ISupplier | undefined] => {
  const { isLoading, data, mutateAsync } = useMutation((id: string) => {
    return Requests.get<ISupplier[]>(endPoints.supplier(id))
  })

  useEffect(() => {
    id && mutateAsync(id).then(([result]) => setSupplier(result))
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return [isLoading, data ? data[0] : undefined]
}

interface IGetSupplierItemMutation {
  supplier: string
  supplierItem: string
}

export const useGetSupplierItem = (
  supplierId?: string,
  supplierItemId?: string
): [boolean, ISupplierItem | undefined] => {
  const { isLoading, data, mutateAsync } = useMutation(
    ({ supplier, supplierItem }: IGetSupplierItemMutation) => {
      return Requests.get<ISupplierItem[]>(
        endPoints.supplierItems(supplier, supplierItem)
      )
    }
  )

  useEffect(() => {
    supplierId &&
      supplierItemId &&
      mutateAsync({ supplier: supplierId, supplierItem: supplierItemId }).then(
        ([result]) => setSupplierItem(result)
      )
  }, [supplierItemId]) // eslint-disable-line react-hooks/exhaustive-deps

  return [isLoading, data ? data[0] : undefined]
}

export const useGetUnits = (): [boolean, IUnit[]] => {
  const [fetching, setFetching] = useState(true)
  const [units, setUnits] = useState<IUnit[]>([])

  useEffect(() => {
    Requests.get<IUnit[]>(endPoints.items + '/units')
      .then(setUnits)
      .finally(() => {
        setFetching(false)
      })
  }, [])

  return [fetching, units]
}

export const useCategories = (
  fetch?: boolean
): [boolean, boolean, ICategory[]] => {
  const {
    isError,
    data = [],
    mutateAsync,
  } = useMutation(() => Requests.get<ICategory[]>(endPoints.categories))

  const [loading, setLoading] = useState(Boolean(fetch))

  useEffect(() => {
    fetch &&
      mutateAsync().then(result => {
        setCategories(result)
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [loading, isError, data]
}

export const useCategory = (
  id: string
): [boolean, boolean, ICategory | undefined] => {
  const { isLoading, isError, data, mutateAsync } = useMutation(() =>
    Requests.get<ICategory>(endPoints.categories + '/' + id)
  )

  useEffect(() => {
    mutateAsync()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [isLoading, isError, data]
}
