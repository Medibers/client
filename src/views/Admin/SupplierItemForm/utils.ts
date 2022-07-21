import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'

export const MIN_ITEM_PRICE = 500

export const urlIsDataURL = (url: string = '') => url.startsWith('data:')

export const getUploadedImageUrls = (urls: string[]): string[] => {
  return urls.filter(url => !url.endsWith('/no-icon.svg'))
}

export const getItemFormDefaultValues = (
  item?: ISupplierItem
): ISupplierItemFormFields => {
  const values: ISupplierItemFormFields = {
    item: null,
    price: null,
    images: [],
  }

  if (item) {
    const { _id: itemId, price, images = [] } = item
    values.item = itemId
    values.price = price
    values.images = images
  }

  return values
}
