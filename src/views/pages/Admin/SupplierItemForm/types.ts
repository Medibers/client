import { ISupplier, ISupplierItem } from '../types'

export interface ISupplierItemFormFields {
  item: string | null
  price: number | null
  'country-origin': string | null
  images: string[] // File[]
}

export interface ILocationState {
  supplier: ISupplier
  item: ISupplierItem
}
