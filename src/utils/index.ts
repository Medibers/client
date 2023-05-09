import { isPlatform } from '@ionic/react'
import { ItemRequest as ItemRequestInterface, TItemRequestState } from 'types'

import { AppVersion } from '@ionic-native/app-version'

export const APP_NAME = 'Medibers'

export const getAppVersion = async () =>
  platformIsWebBrowser
    ? require('../../package.json').version
    : await AppVersion.getVersionNumber()

export const TEST_ENV = 'test'

export const platformIsWeb = isPlatform('desktop')
export const platformIsMobile = isPlatform('mobile')
export const platformIsiOS = isPlatform('ios')
export const platformIsAndroid = isPlatform('android')

export const platformIsWebBrowser = window.location.host !== 'localhost' // window.location.host == localhost on mobile apps only

export const archivedRequestStates: Array<String> = ['cancelled', 'received']

export const getActiveRequests = (requests: Array<ItemRequestInterface>) =>
  requests.filter(({ state }) => archivedRequestStates.indexOf(state) < 0)

export const getArchivedRequests = (requests: Array<ItemRequestInterface>) =>
  requests.filter(({ state }) => archivedRequestStates.indexOf(state) > -1)

export const imageServerUrl =
  (window.location.host === 'localhost' // deployment on mobile
    ? process.env.REACT_APP_FILE_SERVER_URL_REMOTE
    : process.env.REACT_APP_FILE_SERVER_URL) + '/images'

export const requestStatesMappedToBadgeBackground: {
  // eslint-disable-next-line no-unused-vars
  [key in TItemRequestState]: string
} = {
  'awaiting transit': 'var(--ion-color-secondary)',
  'out of stock': 'var(--ion-color-out-of-stock)',
  'in transit': 'var(--ion-color-transit)',
  cancelled: 'var(--ion-color-cancelled)',
  delivered: 'var(--ion-color-primary)',
  received: 'var(--ion-color-primary)',
}

export const getItemState = (available: boolean) =>
  available ? 'Available' : 'Out of stock'

export const indexIsLastInArray = (
  index: number,
  array: Array<unknown>
): boolean => index === array.length - 1

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = (str: string) => emailRegex.test(str)

export const placeholderImageUrl = '/placeholder.jpeg' // /static/assets/icons/no-icon.svg
