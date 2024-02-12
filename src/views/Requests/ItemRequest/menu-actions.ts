import { ItemRequest, MenuAction } from 'types'

import {
  userIsAdmin,
  userIsClientUser,
  userIsCourier,
  userIsPharmacyOperator,
} from 'utils/role'
import { updateBackend } from '../utils'

function fn(this: {
  updateRequestsUI: (response: ItemRequest[]) => void
  onCourierPopoverShow: () => void
}): MenuAction[] {
  const { updateRequestsUI, onCourierPopoverShow } = this
  const defaultMenuActions: Array<MenuAction> = []

  if (userIsAdmin() || userIsPharmacyOperator()) {
    return [
      {
        text: 'Assign Courier',
        handler: onCourierPopoverShow,
      },
      {
        text: 'Mark as Delivered',
        handler: (requestSelected: string) => {
          updateBackend({ state: 4 }, [requestSelected], updateRequestsUI) // delivered
        },
      },
    ]
  }

  if (userIsClientUser()) {
    return [
      {
        text: 'Mark as Received',
        handler: (requestSelected: string) => {
          updateBackend({ state: 5 }, [requestSelected], updateRequestsUI) // received
        },
      },
      {
        text: 'Cancel',
        handler: (requestSelected: string) => {
          updateBackend({ state: 3 }, [requestSelected], updateRequestsUI) // cancelled
        },
      },
    ]
  }

  if (userIsCourier()) {
    return [
      {
        text: 'Mark as Delivered',
        handler: (requestSelected: string) => {
          updateBackend({ state: 4 }, [requestSelected], updateRequestsUI) // delivered
        },
      },
    ]
  }

  return defaultMenuActions
}

export default fn
