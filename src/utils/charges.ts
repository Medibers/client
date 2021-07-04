import { ItemSearchResult, PharmacyItem } from 'types'

export const computeOrderCostAndDistance = (
  items: Array<ItemSearchResult | PharmacyItem>
) => {
  return items.reduce(
    (acc, { price, quantity = 1, distanceRaw = 0 }) => {
      acc.cost = acc.cost + parseInt(`${price}`) * quantity
      acc.distance = acc.distance + distanceRaw / 2
      return acc
    },
    { cost: 0, distance: 0 }
  )
}
