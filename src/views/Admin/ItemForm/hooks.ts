import { useEffect, useState } from 'react'

import { ICategory, IUnit } from './types'

import CategoryMap from 'utils/item-category-map'

import Requests, { endPoints } from 'requests'

export const useGetCategories = (): ICategory[] => {
  return Object.keys(CategoryMap)
    .filter(key => key !== 'all')
    .map(key => ({
      _id: key,
      name: CategoryMap[key].label,
    }))
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
