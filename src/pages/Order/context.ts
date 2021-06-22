import React from 'react'
import { ItemSearchResult as IItemSearchResult } from 'types'

import { IOrderDeliveryContact } from './types'

interface IOrderContext {
  cost: number
  selectedItems: Array<IItemSearchResult>
  locationNotAvailable: boolean
  contacts: Array<IOrderDeliveryContact>
  onModifyItemQuantity: (a: string) => void
  onAddItem: () => void
  onRemoveItem: (a: string) => void
  onSelectDestination: () => void
  onSetContacts: (a: Array<IOrderDeliveryContact>) => void
}

const Context = React.createContext<IOrderContext>({
  cost: 0,
  selectedItems: [],
  contacts: [],
  locationNotAvailable: true,
  onModifyItemQuantity: () => null,
  onAddItem: () => null,
  onRemoveItem: () => null,
  onSelectDestination: () => null,
  onSetContacts: () => null,
})

export default Context
