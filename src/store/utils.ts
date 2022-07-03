import store from './store'

import * as constants from 'reducers/constants'
import { ItemSearchResult } from 'types'
import { ISupplier, ISupplierItem } from 'views/pages/Admin/types'

export const showLoading = () => {
  store.dispatch({ type: constants.SHOW_LOADING })
}

export const hideLoading = () => {
  store.dispatch({ type: constants.HIDE_LOADING })
}

export const showToast = (payload: string) => {
  store.dispatch({ type: constants.SHOW_TOAST, payload })
}

export const hideToast = () => {
  store.dispatch({ type: constants.HIDE_TOAST })
}

export const showMenu = (event: Event, id?: string) => {
  store.dispatch({ type: constants.SHOW_MENU, payload: { id, event } })
}

export const hideMenu = () => {
  store.dispatch({ type: constants.HIDE_MENU })
}

export const setSearchResult = (payload: ItemSearchResult) => {
  store.dispatch({ type: constants.SET_SEARCH_RESULT, payload })
}

export const setSupplier = (payload: ISupplier) => {
  store.dispatch({ type: constants.SET_SUPPLIER, payload })
}

export const setSupplierItem = (payload: ISupplierItem) => {
  store.dispatch({ type: constants.SET_SUPPLIER_ITEM, payload })
}

export const addToCart = (payload: ItemSearchResult) => {
  store.dispatch({ type: constants.ADD_TO_CART, payload })
}

export const removeFromCart = (id: string) => {
  store.dispatch({ type: constants.REMOVE_FROM_CART, payload: id })
}

export const clearCart = () => {
  store.dispatch({ type: constants.CLEAR_CART })
}

export const setCart = (payload: ItemSearchResult[]) => {
  store.dispatch({ type: constants.SET_CART, payload })
}
