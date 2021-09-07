import decrypt from 'utils/jwt'
import { clearSession, getSessionToken } from 'session'

import {
  About,
  Account,
  AddItem,
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
} from 'views/pages'

import { TRoutes } from './types'

import supplierRoutes from './suppliers'

const Routes: TRoutes = {
  home: {
    path: '/',
    component: Home,
  },
  about: {
    path: '/about',
    component: About,
    isPublic: true,
    preventRedirectWhenSessionAvailable: true,
  },
  tcs: {
    path: '/terms-conditions',
    component: TCs,
    isPublic: true,
    preventRedirectWhenSessionAvailable: true,
  },
  account: {
    path: '/account',
    component: Account,
  },
  search: {
    path: '/search',
    component: Search,
  },
  item: {
    path: '/item',
    component: Item,
  },
  order: {
    path: '/order',
    component: Order,
  },
  location: {
    path: '/location',
    component: Location,
  },
  'item-add': {
    path: '/items/add',
    component: AddItem,
  },
  'item-update': {
    path: '/items/update',
    component: UpdateItem,
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
  },
  passwordReset2: {
    path: '/password-reset/confirm',
    component: PasswordReset2,
    isPublic: true,
  },
  signup1: {
    path: '/signup1',
    component: Signup1,
    isPublic: true,
  },
  signup2: {
    path: '/signup2',
    component: Signup2,
    isPublic: true,
  },
  login: {
    path: '/login',
    component: Login,
    isPublic: true,
  },
  ...supplierRoutes,
}

export default Routes

const RoutesIndexedOnRoles = [
  Routes.home.path,
  Routes.home.path, // Routes.courier.path,
  Routes.home.path, // Routes.admin.path,
  Routes.home.path, // Routes.admin.path,
]

export const getDefaultRoute = (token = getSessionToken()) => {
  const role = decrypt(token).role as number
  if (role === undefined) {
    // Force logout for old client
    clearSession()
    window.location.reload()
  }
  return RoutesIndexedOnRoles[role - 1]
}
