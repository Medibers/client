import { TItemRequestState } from 'types'

import { Courier as ICourier, ItemRequest as IItemRequest } from 'types'

import Requests, { endPoints } from 'requests'

import { hideLoading, showLoading, showToast } from 'store/utils'
import { formatUGMSISDN } from 'utils/msisdn'

import { IOrderDeliveryContact } from 'pages/Order/types'

export const requestStatesFormattedForApi: {
  // eslint-disable-next-line no-unused-vars
  [key in TItemRequestState]: number
} = {
  'awaiting transit': 0,
  'out of stock': 1,
  'in transit': 2,
  cancelled: 3,
  delivered: 4,
  received: 5,
}

export const updateBackend = (
  body: Object,
  requestsSelected: Array<string>,
  cb: (response: IItemRequest[]) => void
) => {
  showLoading()
  const promise = Requests.put<IItemRequest[]>(endPoints['item-requests'], {
    'item-requests': requestsSelected,
    update: body,
  })

  promise
    .then(cb)
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      showToast(err.error || err.toString())
    })
    .finally(hideLoading)

  return promise
}

export const fetchRequests = async (
  animate: boolean = true,
  cb?: Function
): Promise<IItemRequest[]> => {
  if (animate) showLoading()
  const response = await Requests.get<IItemRequest[]>(
    endPoints['item-requests']
  ).catch(err => {
    showToast(err.error || err.toString())
  })
  hideLoading()
  cb && cb()
  return response || []
}

export const fetchCouriers = async () => {
  const response = await Requests.get<ICourier[]>(endPoints['couriers']).catch(
    err => {
      showToast(err.error || err.toString())
      throw err
    }
  )
  return response.map(o => ({
    label: o.name,
    value: o._id,
  }))
}

export const getDeliveryOrderContactsListed = (
  contacts: Array<IOrderDeliveryContact | string>
) =>
  contacts
    .map(contact =>
      formatUGMSISDN(typeof contact === 'string' ? contact : contact.phone)
    )
    .join(', ')
