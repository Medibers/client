import produce from 'immer'
import { Action, ItemRequest } from 'types'

import * as constants from './constants'

export interface State {
  loading: boolean
  toast?: string
  menu?: { id?: string; event: Event }
  requests: Array<ItemRequest> | null
}

const initialState: State = {
  loading: false,
  requests: null,
}

export default (state = initialState, action: Action) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case constants.SHOW_LOADING: {
        draft.loading = true
        break
      }
      case constants.HIDE_LOADING: {
        draft.loading = false
        break
      }
      case constants.SHOW_TOAST: {
        draft.toast = action.payload
        break
      }
      case constants.HIDE_TOAST: {
        delete draft.toast
        break
      }
      case constants.SHOW_MENU: {
        draft.menu = action.payload
        break
      }
      case constants.HIDE_MENU: {
        delete draft.menu
        break
      }
      case constants.SET_ITEM_REQUESTS: {
        draft.requests = action.payload
        break
      }
      case constants.SET_ITEM_REQUEST: {
        if (draft.requests === null) break
        draft.requests[
          draft.requests.findIndex(({ _id }) => _id === action.payload._id)
        ] = action.payload
        break
      }
      default:
        break
    }
  })
