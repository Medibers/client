import { TItemRequestState } from 'types'

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
