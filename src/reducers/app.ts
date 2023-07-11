import produce from 'immer'
import { getCart, setCart } from 'session'
import { Action, ICategory, ItemRequest, ItemSearchResult } from 'types'
import { ISupplier, ISupplierItem } from 'views/Admin/types'

import * as constants from './constants'

export interface State {
  loading: boolean
  toast?: string
  menu?: { id?: string; event: Event }
  requests: Array<ItemRequest> | null
  searchResult?: ItemSearchResult
  supplier?: ISupplier
  supplierItem?: ISupplierItem
  cart: Array<ItemSearchResult>
  categories?: Array<ICategory>
}

const initialState: State = {
  loading: false,
  requests: null,
  cart: getCart(),
}

const fn = (state = initialState, action: Action) =>
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
      case constants.SET_SEARCH_RESULT: {
        draft.searchResult = action.payload
        break
      }
      case constants.SET_SUPPLIER: {
        draft.supplier = action.payload
        break
      }
      case constants.SET_SUPPLIER_ITEM: {
        draft.supplierItem = action.payload
        break
      }
      case constants.ADD_TO_CART: {
        draft.cart.push(action.payload)
        setCart(draft.cart)
        break
      }
      case constants.REMOVE_FROM_CART: {
        draft.cart = draft.cart.filter(item => item._id !== action.payload)
        setCart(draft.cart)
        break
      }
      case constants.CLEAR_CART: {
        draft.cart = []
        setCart(draft.cart)
        break
      }
      case constants.SET_CART: {
        setCart(action.payload)
        break
      }
      case constants.SET_CATEGORIES: {
        draft.categories = action.payload
        break
      }
      case constants.SET_CATEGORY: {
        const index = (draft.categories as ICategory[]).findIndex(
          ({ _id }) => _id === action.payload._id
        )
        // @ts-ignore
        draft.categories[index] = action.payload
        break
      }
      default:
        break
    }
  })

export default fn
