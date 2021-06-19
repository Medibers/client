import React from 'react'
import Routes from 'routes'
import { ellipsisVertical as more, person } from 'ionicons/icons'

import { showMenu } from 'store/utils'

import { navigateTo } from 'app-history'
import { ItemRequest, ToolbarAction } from 'types'

import { getUserRole, userIsClientUser } from 'utils/role'

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
    switch (getUserRole()) {
      case 1:
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
      case 2:
        return [
          {
            text: 'Mark as Delivered',
            handler: () => {
              updateBackend({ state: 4 }, requestsSelected, updateRequestsUI) // delivered
            },
          },
        ]
      case 3:
        return [
          {
            text: 'Assign to Courier',
            handler: onCourierPopoverShow,
          },
        ]
      case 4:
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
