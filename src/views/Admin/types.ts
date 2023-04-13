import { ICategory, ICurrency, IUnit } from 'types'
import { ISupplierFormFields } from './SupplierForm/types'

export interface ISupplier extends ISupplierFormFields {
  _id: string
}

export interface IItem {
  _id: string
  name: string
  category: string
  categoryObject: ICategory
  specification: Array<string>
}

export interface ISupplierItem {
  _id: string
  item: IItem
  pharmacy: {
    _id: string
    name: string
  }
  currency: ICurrency
  price: number
  images: string[]
  available: boolean
  unit: IUnit
}
