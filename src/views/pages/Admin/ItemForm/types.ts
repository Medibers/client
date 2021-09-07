import { ItemSearchResult as IItemSearchResult } from 'types'

export interface IItemFormFields {
  category: string | null
  name: string | null
  description: string | null
  specification: string | null
  more: string[]
  unit: string | null
}

export interface IItem extends IItemFormFields {
  _id: string
}

export interface ICategory {
  _id: string
  name: string
}

export interface IUnit {
  _id: string
  singular: string
  plural: string
}

export interface ILocationState extends IItemSearchResult {
  selectedCategory?: string
}
