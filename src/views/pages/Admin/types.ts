import { ISupplierFormFields } from './SupplierForm/types'

export interface ISupplier extends ISupplierFormFields {
  _id: string
}

export interface IItem {
  _id: string
  name: string
  category: string
  description: Array<string>
  specification?: Array<string>
  more?: Array<string>
  'icon-urls': Array<string>
  'country-origin': string
}

export interface ISupplierItem {
  _id: string
  item: IItem
  pharmacy: {
    _id: string
    name: string
  }
  price: number
  'country-origin': string | null
  images: string[]
  available: boolean
  unit: { _id: string }
}
