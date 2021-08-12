import { ItemSearchResult, PharmacyItem } from 'types'

export const computeOrderCost = (
  items: Array<ItemSearchResult | PharmacyItem>
) => {
  return items.reduce((acc, { price, quantity = 1 }) => {
    acc = acc + parseInt(String(price)) * quantity
    return acc
  }, 0)
}
