import {
  languageSharp as language,
  locationSharp as location,
  person,
} from 'ionicons/icons'

import Routes from 'routes'
import { getDeliveryAddressForNextOrder } from 'location'

import { formatUGMSISDN } from 'utils/msisdn'
import { getSessionPhone } from 'session'

import { userIsClientUser } from 'utils/role'
import { navigateTo } from 'app-history'

import { getLanguage, languages } from 'languages'

import { IItem } from './types'

const address = getDeliveryAddressForNextOrder()

const userIsClient = userIsClientUser()

export function getListItems(this: {
  showLanguagePopover: () => void
}): Array<IItem | null> {
  const { showLanguagePopover } = this

  const items = [
    {
      name: 'Phone',
      value: formatUGMSISDN(getSessionPhone() || ''),
      icon: person,
    },
    {
      name: 'Language',
      value: currentLanguage,
      handler: showLanguagePopover,
      icon: language,
    },
  ]

  return userIsClient
    ? [
        {
          name: 'Delivery location',
          value: address,
          actionText: address ? undefined : 'Set',
          handler: () => navigateTo(Routes.location.path),
          icon: location,
        },
        ...items,
      ]
    : items
}

export const currentLanguage = (
  languages.find(({ value }) => value === getLanguage()) || languages[0]
).label

export const menuId = 'profile-menu'
