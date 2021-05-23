import Routes from 'routes'

import { ItemRequest, MenuAction } from 'types'

type TGetMenuActions = (
  updateBackend: (
    update: Partial<ItemRequest<number>>,
    requests: string[]
  ) => void,
  onAssignCourier: () => void
) => MenuAction[]

const fn: TGetMenuActions = (updateBackend, onAssignCourier) => {
  const defaultMenuActions: Array<MenuAction> = []

  switch (window.location.pathname) {
    case Routes.requests.path:
      return [
        {
          text: 'Mark as received',
          handler: (requestSelected: string) => {
            updateBackend({ state: 5 }, [requestSelected]) // received
          },
        },
        {
          text: 'Cancel',
          handler: (requestSelected: string) => {
            updateBackend({ state: 3 }, [requestSelected]) // cancelled
          },
        },
      ]
    case Routes.courier.path:
      return [
        {
          text: 'Mark as delivered',
          handler: (requestSelected: string) => {
            updateBackend({ state: 4 }, [requestSelected]) // delivered
          },
        },
      ]
    case Routes.admin.path:
      return [
        {
          text: 'Assign to courier',
          handler: onAssignCourier,
        },
      ]
    default:
      return defaultMenuActions
  }
}

export default fn
