import { useEffect, useState } from 'react'

import Requests, { endPoints } from 'requests'

import { IItem } from 'views/pages/Admin/types'

import { useDebounce } from 'views/pages/Admin/utils'

export const useGetItems = (searchStr: string | null): [boolean, IItem[]] => {
  const [fetching, setFetching] = useState(true)
  const [items, setItems] = useState<IItem[]>([
    {
      _id: '1',
      name: 'Aaaa',
      category: '',
      description: [],
      'icon-urls': [],
      'country-origin': '',
    },
    {
      _id: '2',
      name: 'Abaa',
      category: '',
      description: [],
      'icon-urls': [],
      'country-origin': '',
    },
    {
      _id: '3',
      name: 'Acaa',
      category: '',
      description: [],
      'icon-urls': [],
      'country-origin': '',
    },
  ])

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
