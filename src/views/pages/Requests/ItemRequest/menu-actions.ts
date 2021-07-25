import { ItemRequest, MenuAction } from 'types'

import { getUserRole } from 'utils/role'
import { updateBackend } from '../utils'

function fn(this: {
  updateRequestsUI: (response: ItemRequest[]) => void
  onCourierPopoverShow: () => void
}): MenuAction[] {
  const { updateRequestsUI, onCourierPopoverShow } = this
  const defaultMenuActions: Array<MenuAction> = []

  switch (getUserRole()) {
    case 1:
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
    case 2:
      return [
        {
          text: 'Mark as Delivered',
          handler: (requestSelected: string) => {
            updateBackend({ state: 4 }, [requestSelected], updateRequestsUI) // delivered
          },
        },
      ]
    case 3:
      return [
        {
          text: 'Assign Courier',
          handler: onCourierPopoverShow,
        },
      ]
    case 4:
      return [
        {
          text: 'Assign Courier',
          handler: onCourierPopoverShow,
        },
      ]
    default:
      return defaultMenuActions
  }
}

export default fn
