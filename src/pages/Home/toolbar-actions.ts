import React from 'react'

import {
  ellipsisVertical as more,
  person,
  searchSharp as search,
} from 'ionicons/icons'

import { ToolbarAction } from 'types'

import Routes from 'routes'
import { navigateTo } from 'app-history'

import store from 'store'
import * as constants from 'reducers/constants'

import getPageText from 'text'

const showMenu = (payload: Event) => {
  store.dispatch({
    type: constants.SHOW_MENU,
    payload,
  })
}

const Text = getPageText('home')

export const getHomeToolbarActions = (): ToolbarAction[] => {
  return [
    {
      text: Text['toolbar-action-orders'],
      handler: () => navigateTo(Routes.requests.path),
    },
    {
      icon: search,
      handler: () => navigateTo(Routes.search.path),
    },
    {
      icon: person,
      handler: () => navigateTo(Routes.account.path),
    },
    {
      icon: more,
      handler: (event: React.MouseEvent) => {
        showMenu(event.nativeEvent)
      },
    },
  ]
}
