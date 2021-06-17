import React from 'react'

import { ItemRequest as IItemRequest } from 'types'

interface IRequestContext {
  selectModeOn: boolean
  activeRequests: Array<IItemRequest>
  archivedRequests: Array<IItemRequest>
  requestsSelected: Array<string>
  onItemSelected: (item: string) => void
  onItemSelectedFromActionMenu: (item: string) => void
  updateRequestsUI: (response: IItemRequest[], prependRequests?: true) => void
  onCourierPopoverShow: () => void
}

const Context = React.createContext<IRequestContext>({
  selectModeOn: false,
  activeRequests: [],
  archivedRequests: [],
  requestsSelected: [],
  onItemSelected: () => {},
  onItemSelectedFromActionMenu: () => {},
  updateRequestsUI: () => {},
  onCourierPopoverShow: () => {},
})

export default Context
