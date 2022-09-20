import decrypt from 'utils/jwt'
import { getSessionToken } from 'session'

import {
  About,
  Account,
  AddItem,
  Admin,
  CompletedOrder,
  Home,
  Item,
  Location,
  Login,
  Order,
  PasswordReset1,
  PasswordReset2,
  Requests,
  Search,
  Signup1,
  Signup2,
  TCs,
  UpdateItem,
} from 'views'

import { TRoutes } from './types'

import supplierRoutes from './suppliers'

const Routes: TRoutes = {
  about: {
    path: '/about',
    component: About,
    isPublic: true,
  },
  tcs: {
    path: '/terms-conditions',
    component: TCs,
    isPublic: true,
  },
  account: {
    path: '/account',
    component: Account,
  },
  search: {
    path: '/search',
    component: Search,
    isPublic: true,
  },
  order: {
    path: '/order',
    component: Order,
  },
  location: {
    path: '/location',
    component: Location,
  },
  'item-update': {
    path: '/items/:id/update',
    getPath: (id: string) => `/items/${id}/update`,
    component: UpdateItem,
    isForAdmins: true,
  },
  'item-add': {
    path: '/items/add',
    component: AddItem,
    isForAdmins: true,
  },
  item: {
    path: '/items/:id',
    getPath: (id: string) => `/items/${id}`,
    component: Item,
    isPublic: true,
  },
  requests: {
    path: '/requests',
    component: Requests,
  },
  request: {
    path: '/request',
    component: CompletedOrder,
  },
  passwordReset1: {
    path: '/password-reset',
    component: PasswordReset1,
    isPublic: true,
    redirectWhenSessionAvailable: true,
  },
  passwordReset2: {
    path: '/password-reset/confirm',
    component: PasswordReset2,
    isPublic: true,
    redirectWhenSessionAvailable: true,
  },
  signup1: {
    path: '/signup1',
    component: Signup1,
    isPublic: true,
    redirectWhenSessionAvailable: true,
  },
  signup2: {
    path: '/signup2',
    component: Signup2,
    isPublic: true,
    redirectWhenSessionAvailable: true,
  },
  login: {
    path: '/login',
    component: Login,
    isPublic: true,
    redirectWhenSessionAvailable: true,
  },
  admin: {
    path: '/admin',
    component: Admin,
    isForAdmins: true,
    exact: false,
  },
  ...supplierRoutes,
  home: {
    path: '/',
    component: Home,
    isPublic: true,
  },
}

export default Routes

const RoutesIndexedOnRoles = [
  Routes.home.path,
  Routes.home.path,
  Routes.home.path, // Routes.admin.path, // admin
  Routes.home.path, // Routes.admin.path, // admin
]

export const getDefaultRoute = (token = getSessionToken()) => {
  const role = decrypt(token).role as number
  return RoutesIndexedOnRoles[role - 1] || Routes.home.path
}

export const ADMIN_URL = '/admin'

export const SUPPLIERS_URL = ADMIN_URL + '/suppliers'
export const ADD_SUPPLIER_URL = SUPPLIERS_URL + '/add'
export const SUPPLIER_URL = SUPPLIERS_URL + '/:id'
export const UPDATE_SUPPLIER_URL = SUPPLIER_URL + '/update'
export const ADD_SUPPLIER_ITEM_URL = SUPPLIERS_URL + '/items/add'
export const UPDATE_SUPPLIER_ITEM_URL =
  SUPPLIERS_URL + '/:supplierId/items/:supplierItemId/update'

export const CATEGORIES_URL = ADMIN_URL + '/categories'
export const ADD_CATEGORY_URL = CATEGORIES_URL + '/add'
export const CATEGORY_URL = CATEGORIES_URL + '/:id'

export const getCategoryUrl = (id: string) => CATEGORY_URL.replace(':id', id)
