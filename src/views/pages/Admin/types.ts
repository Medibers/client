import { ISupplierFormFields } from './SupplierForm/types'

export interface ISupplier extends ISupplierFormFields {
  _id: string
}

export interface IItem {
  _id: string
  name: string
  category: string
  specification: Array<string>
}

export interface ISupplierItem {
  _id: string
  item: IItem
  pharmacy: {
    _id: string
    name: string
  }
  price: number
  images: string[]
  available: boolean
  unit: { _id: string }
}
