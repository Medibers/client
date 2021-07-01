import decrypt from 'utils/jwt'
import { clearSession, getSessionToken } from 'session'

import {
  About,
  Account,
  Home,
  Item,
  Location,
  Login,
  Order,
  Request,
  Requests,
  Search,
  Signup1,
  Signup2,
  TCs,
} from 'pages'

interface IRoute {
  path: string
  component: Function
  isPublic?: boolean
  preventRedirectWhenSessionAvailable?: true
}

const Routes: Record<string, IRoute> = {
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
  requests: {
    path: '/requests',
    component: Requests,
  },
  request: {
    path: '/request',
    component: Request,
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
