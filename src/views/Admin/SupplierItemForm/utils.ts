import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'

export const MIN_ITEM_PRICE = 1 // Modified from 500 cause can be in other currencies

export const getUploadedImageUrls = (urls: string[]): string[] => {
  return urls.filter(url => !url.endsWith('/no-icon.svg'))
}

export const getItemFormDefaultValues = (
  item?: ISupplierItem
): ISupplierItemFormFields => {
  const values: ISupplierItemFormFields = {
    item: null,
    currency: null,
    price: null,
    images: [],
  }

  if (item) {
    const { _id: itemId, currency, price, images = [] } = item
    values.item = itemId
    values.currency = currency._id
    values.price = price
    values.images = images
  }

  return values
}
