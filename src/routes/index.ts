import decrypt from 'utils/jwt'
import { getSessionToken } from 'session'

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
  item: {
    path: '/item',
    component: Item,
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
  'item-add': {
    path: '/items/add',
    component: AddItem,
    isForAdmins: true,
  },
  'item-update': {
    path: '/items/update',
    component: UpdateItem,
    isForAdmins: true,
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
