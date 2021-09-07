import ItemCategoryMap from 'utils/item-category-map'

export const itemCategories = Object.keys(ItemCategoryMap).map(
  (key: string) => ({
    label: ItemCategoryMap[key].label,
    value: key,
  })
)
