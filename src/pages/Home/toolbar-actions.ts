import React from 'react'

import {
  ellipsisVertical as more,
  person,
  bicycle as requestsIcon,
  searchSharp as search,
} from 'ionicons/icons'

import { ToolbarAction } from 'types'

import Routes from 'routes'
import { navigateTo } from 'app-history'

import store from 'store'

import * as constants from 'reducers/constants'

const showMenu = (payload: Event) => {
  store.dispatch({
    type: constants.SHOW_MENU,
    payload,
  })
}

export const getHomeToolbarActions = (): ToolbarAction[] => {
  return [
    {
      icon: requestsIcon,
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
