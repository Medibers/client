import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'

export const MIN_ITEM_PRICE = 500

export const urlIsDataURL = (url: string = '') => url.startsWith('data:')

export const getItemFormDefaultValues = (
  item?: ISupplierItem
): ISupplierItemFormFields => {
  const values: ISupplierItemFormFields = {
    item: null,
    price: null,
    'country-origin': null,
    images: [],
  }

  if (item) {
    const {
      _id: itemId,
      price,
      'country-origin': countryOrigin,
      images = [],
    } = item
    values.item = itemId
    values.price = price
    values['country-origin'] = countryOrigin
    values.images = images
  }

  return values
}
