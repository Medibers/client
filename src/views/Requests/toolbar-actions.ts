import React from 'react'
import Routes from 'routes'
import { ellipsisVertical as more, person } from 'ionicons/icons'

import { showMenu } from 'store/utils'

import { navigateTo } from 'app-history'
import { ItemRequest, ToolbarAction } from 'types'

import {
  userIsAdmin,
  userIsClientUser,
  userIsCourier,
  userIsPharmacyOperator,
} from 'utils/role'

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

  if (userIsClientUser() || requestsSelected.length === 0) {
    return defaultToolbarActions
  }

  if (userIsAdmin() || userIsPharmacyOperator()) {
    return [
      {
        text: 'Assign to Courier',
        handler: onCourierPopoverShow,
      },
      {
        text: 'Mark as Delivered',
        handler: () => {
          updateBackend({ state: 4 }, requestsSelected, updateRequestsUI) // delivered
        },
      },
    ]
  }

  if (userIsClientUser()) {
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
  }

  if (userIsCourier()) {
    return [
      {
        text: 'Mark as Delivered',
        handler: () => {
          updateBackend({ state: 4 }, requestsSelected, updateRequestsUI) // delivered
        },
      },
    ]
  }

  return defaultToolbarActions
}

export default getRequestsToolbarActions
