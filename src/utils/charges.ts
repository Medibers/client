import { ItemSearchResult, PharmacyItem } from 'types'
import { formatMoney } from './currency'

const computeOrderCost = (
  items: Array<ItemSearchResult | PharmacyItem>,
  deliveryFee: number | null = 0 // Assumed always in UGX
) =>
  items.reduce(
    (acc, { currency, price, quantity = 1 }) => {
      if (acc[currency.name]) {
        acc[currency.name] =
          acc[currency.name] + parseInt(String(price)) * quantity
      } else {
        acc[currency.name] = parseInt(String(price)) * quantity
      }
      return acc
    },
    {
      UGX: deliveryFee,
    } as Record<string, number>
  )

export const stringifyOrderCost = (
  items: Array<ItemSearchResult | PharmacyItem>,
  deliveryFee: number | null = 0 // Assumed always in UGX
) =>
  Object.entries(computeOrderCost(items, deliveryFee))
    .map(([k, v]) => formatMoney(v, k))
    .join(' + ')
