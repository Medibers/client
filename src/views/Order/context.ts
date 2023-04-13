import React from 'react'
import { ItemSearchResult as IItemSearchResult } from 'types'

import { IOrderDeliveryContact } from './types'

interface IOrderContext {
  deliveryFee: number | null
  selectedItems: Array<IItemSearchResult>
  locationNotAvailable: boolean
  contacts: Array<IOrderDeliveryContact>
  onModifyItemQuantity: (itemId: string, quantity: number) => void
  onSelectDestination: () => void
  onSetContacts: (a: Array<IOrderDeliveryContact>) => void
}

const Context = React.createContext<IOrderContext>({
  deliveryFee: null,
  selectedItems: [],
  contacts: [],
  locationNotAvailable: true,
  onModifyItemQuantity: () => null,
  onSelectDestination: () => null,
  onSetContacts: () => null,
})

export default Context
