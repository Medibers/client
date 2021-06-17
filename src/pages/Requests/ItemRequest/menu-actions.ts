import Routes from 'routes'

import { ItemRequest, MenuAction } from 'types'

import { updateBackend } from '../utils'

function fn(this: {
  updateRequestsUI: (response: ItemRequest[]) => void
  onCourierPopoverShow: () => void
}): MenuAction[] {
  const { updateRequestsUI, onCourierPopoverShow } = this
  const defaultMenuActions: Array<MenuAction> = []

  switch (window.location.pathname) {
    case Routes.requests.path:
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
    case Routes.courier.path:
      return [
        {
          text: 'Mark as Delivered',
          handler: (requestSelected: string) => {
            updateBackend({ state: 4 }, [requestSelected], updateRequestsUI) // delivered
          },
        },
      ]
    case Routes.admin.path:
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
