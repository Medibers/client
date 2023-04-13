import { useEffect, useState } from 'react'

import Requests, { endPoints } from 'requests'
import { ICurrency } from 'types'

import { IItem } from 'views/Admin/types'

import { useDebounce } from 'views/Admin/utils'

export const useGetItems = (searchStr: string | null): [boolean, IItem[]] => {
  const [fetching, setFetching] = useState(true)
  const [data, setData] = useState<IItem[]>([])

  const debouncedSearchStr = useDebounce(searchStr || '') // Debounce this

  useEffect(() => {
    searchStr &&
      Requests.get<IItem[]>(endPoints.items + '/?search=' + debouncedSearchStr)
        .then(setData)
        .finally(() => {
          setFetching(false)
        })
  }, [debouncedSearchStr]) // eslint-disable-line react-hooks/exhaustive-deps

  return [fetching, data]
}

export const useCurrencies = (): [boolean, ICurrency[]] => {
  const [fetching, setFetching] = useState(true)
  const [data, setData] = useState<ICurrency[]>([])

  useEffect(() => {
    Requests.get<ICurrency[]>(endPoints.currencies)
      .then(setData)
      .finally(() => {
        setFetching(false)
      })
  }, [])

  return [fetching, data]
}
