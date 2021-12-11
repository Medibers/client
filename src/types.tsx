import { MouseEvent } from 'react'
import { IOrderDeliveryContact } from 'views/pages/Order/types'

export interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface ToolbarAction {
  text?: string
  icon?: string
  component?: () => JSX.Element
  handler: (a1: MouseEvent) => void
}

export interface MenuAction {
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (a1: any) => void
}

export interface IItem {
  _id: string
  name: string
  category: string
  specification: Array<string>
}

export interface ItemSearchResult {
  _id: string
  item: IItem
  pharmacy: {
    _id: string
    name: string
  }
  price: number
  quantity?: number // Quantity ordered
  images: Array<string>
  available: boolean
  distance?: string
  distanceRaw?: number
  unit: { _id: string }
}

export interface PharmacyItem {
  item: { _id: string; 'common-name': string; 'scientific-name': string }
  pharmacy: { _id: string; name: string }
  price: number
  quantity: number
  distanceRaw?: number
}

export type TItemRequestState =
  | 'awaiting transit'
  | 'out of stock'
  | 'in transit'
  | 'cancelled'
  | 'delivered'
  | 'received'

export interface ItemRequest<TState = TItemRequestState> {
  _id: string
  pharmacyItems: Array<PharmacyItem>
  notes: string
  state: TState
  createdAt: number
  courier?: Courier
  contacts: Array<IOrderDeliveryContact>
  lat: number
  lon: number
  distance?: number | null
  deliveryFee?: number | null
  address: string
  user: {
    _id: string
    name: string
    phone: string
  }
}

export interface Courier {
  _id: string
  alias: string
  name: string
  phones: Array<string>
  means: Array<string>
}

export interface Location {
  lat: number
  lon: number
}

export interface CreditOffer {
  _id: string
  value: number
  price: number
  starred?: boolean
}

export interface PaymentChannel {
  _id: string
  name: string
  description: string | JSX.Element
  icon?: string
  requiresNumber?: true
  unavailable?: true
}
