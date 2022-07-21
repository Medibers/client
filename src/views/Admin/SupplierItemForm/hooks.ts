import { useEffect, useState } from 'react'

import Requests, { endPoints } from 'requests'

import { IItem } from 'views/Admin/types'

import { useDebounce } from 'views/Admin/utils'

export const useGetItems = (searchStr: string | null): [boolean, IItem[]] => {
  const [fetching, setFetching] = useState(true)
  const [items, setItems] = useState<IItem[]>([])

  const debouncedSearchStr = useDebounce(searchStr || '') // Debounce this

  useEffect(() => {
    searchStr &&
      Requests.get<IItem[]>(endPoints.items + '/?search=' + debouncedSearchStr)
        .then(setItems)
        .finally(() => {
          setFetching(false)
        })
  }, [debouncedSearchStr]) // eslint-disable-line react-hooks/exhaustive-deps

  return [fetching, items]
}
