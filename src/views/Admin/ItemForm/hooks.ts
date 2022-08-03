import { ICategory } from './types'

import CategoryMap from 'utils/item-category-map'

export const useGetCategories = (): ICategory[] => {
  return Object.keys(CategoryMap)
    .filter(key => key !== 'all')
    .map(key => ({
      _id: key,
      name: CategoryMap[key].label,
    }))
}
