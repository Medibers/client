import React from 'react'

import { ItemRequest as IItemRequest } from 'types'

interface IRequestsContext {
  selectModeOn: boolean
  activeRequests: Array<IItemRequest>
  archivedRequests: Array<IItemRequest>
  requestsSelected: Array<string>
  onItemSelected: (item: string) => void
  onItemSelectedFromActionMenu: (item: string) => void
  updateRequestsUI: (response: IItemRequest[], prependRequests?: true) => void
  onCourierPopoverShow: () => void
}

const Context = React.createContext<IRequestsContext>({
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
