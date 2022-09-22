/* eslint-disable prettier/prettier */

import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { QueryClient } from 'react-query'
import { getSessionToken, sessionAvailable } from 'session'

const defaultHeaders = {
  'Response-Language': 'en',
}

const headers = sessionAvailable()
  ? Object.assign(defaultHeaders, {
    Authorization: `Bearer ${getSessionToken()}`,
  })
  : defaultHeaders

let baseURL =
  window.location.host === 'localhost' // deployment on mobile
    ? process.env.REACT_APP_BACKEND_URL_REMOTE
    : process.env.REACT_APP_BACKEND_URL

interface IAxiosInstance extends AxiosInstance {
  get<T = unknown, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>
  delete<T = unknown, R = T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>
  post<T = unknown, R = T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R>
  put<T = unknown, R = T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R>
  patch<T = unknown, R = T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R>
}

const timeout = 20000

const instance1: IAxiosInstance = Axios.create({ baseURL, headers, timeout }) // API instance

baseURL =
  window.location.host === 'localhost' // deployment on mobile
    ? process.env.REACT_APP_FILE_SERVER_URL_REMOTE
    : process.env.REACT_APP_FILE_SERVER_URL

const instance2 = Axios.create({ baseURL, timeout }) // File server instance

const NETWORK_ERROR = 'No connection'

const instances = [instance1, instance2]

instances.forEach(function (instance) {
  instance.interceptors.response.use(
    function (response) {
      // Runs for status codes within 2**
      return response.data
    },
    function (error) {
      // Runs for status codes outside 2**
      return Promise.reject(
        error.response ? error.response.data : NETWORK_ERROR
      )
    }
  )
})

export default instance1

export const FileServer = instance2

export const endPoints = {
  login: '/user/login',
  signup1: '/user/new',
  signup2: '/user/register',
  'password-reset-1': '/user/password-reset',
  'password-reset-2': '/user/password-reset/confirm',
  'item-search': (id?: string) =>
    id ? `/items/search/${id}` : '/items/search',
  'item-requests': '/item-request',
  'item-requests-delivery-details': '/item-request/delivery-details',
  credits: '/credits',
  'credit-offers': '/credits/offers',
  'mtn-msisdn': '/user/mtn-msisdn',
  couriers: '/couriers',
  'push-notification-token': '/push-notification-token',
  'support-contacts': '/support/contacts',
  faqs: '/docs/faqs.json',
  tcs: '/docs/tcs.md',
  suppliers: '/suppliers',
  supplier: (id: string) => `/suppliers/${id}`,
  items: '/items',
  supplierItems: (supplierId: string, supplierItemId?: string) =>
    supplierItemId
      ? `/suppliers/${supplierId}/items/${supplierItemId}`
      : `/suppliers/${supplierId}/items`,
  categories: '/items/categories',
}

export const queryClient = new QueryClient()

export * from './hooks'
