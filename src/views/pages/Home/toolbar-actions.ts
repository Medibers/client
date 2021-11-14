import React from 'react'

import {
  ellipsisVertical as more,
  person,
  searchSharp as search,
} from 'ionicons/icons'

import { ToolbarAction } from 'types'

import Routes from 'routes'
import { navigateTo } from 'app-history'

import { showMenu } from 'store/utils'

import getPageText from 'text'
import { sessionAvailable } from 'session'

const Text = getPageText('home')

export const getHomeToolbarActions = (): ToolbarAction[] => {
  const searchAction = {
    icon: search,
    handler: () =>
      navigateTo(Routes.search.path, { selectedCategory: undefined }),
  }

  const moreAction = {
    icon: more,
    handler: (event: React.MouseEvent) => {
      showMenu(event.nativeEvent)
    },
  }

  return sessionAvailable()
    ? [
        {
          text: Text['toolbar-action-orders'],
          handler: () => navigateTo(Routes.requests.path),
        },
        searchAction,
        {
          icon: person,
          handler: () => navigateTo(Routes.account.path),
        },
        moreAction,
      ]
    : [
        {
          text: 'Login',
          handler: () => navigateTo(Routes.login.path),
        },
        searchAction,
        moreAction,
      ]
}
