import React from 'react'
import Routes from 'routes'
import { ellipsisVertical as more, person } from 'ionicons/icons'

import { showMenu } from 'store/utils'

import { getLocationPath, navigateTo } from 'app-history'
import { ItemRequest, ToolbarAction } from 'types'

import { userIsClientUser } from 'utils/role'

import { updateBackend } from './utils'

export const menuId = 'request-toolbar-actions'

function getRequestsToolbarActions(this: {
  requestsSelected: string[]
  updateRequestsUI: (response: ItemRequest[]) => void
  onCourierPopoverShow: () => void
}): ToolbarAction[] {
  const { requestsSelected, updateRequestsUI, onCourierPopoverShow } = this
  const defaultToolbarActions: Array<ToolbarAction> = [
    {
      icon: person,
      handler: () => navigateTo(Routes.account.path),
    },
    {
      icon: more,
      handler: (event: React.MouseEvent) => {
        showMenu(event.nativeEvent, menuId)
      },
    },
  ]

  if (userIsClientUser()) return defaultToolbarActions

  if (requestsSelected.length > 0) {
    switch (getLocationPath()) {
      case Routes.requests.path:
        return [
          {
            text: 'Mark as Received',
            handler: () => {
              updateBackend({ state: 5 }, requestsSelected, updateRequestsUI) // received
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              updateBackend({ state: 3 }, requestsSelected, updateRequestsUI) // cancelled
            },
          },
        ]
      case Routes.courier.path:
        return [
          {
            text: 'Mark as Delivered',
            handler: () => {
              updateBackend({ state: 4 }, requestsSelected, updateRequestsUI) // delivered
            },
          },
        ]
      case Routes.admin.path:
        return [
          {
            text: 'Assign to Courier',
            handler: onCourierPopoverShow,
          },
        ]
      default:
        return defaultToolbarActions
    }
  } else {
    return defaultToolbarActions
  }
}

export default getRequestsToolbarActions
