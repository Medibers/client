import Routes from 'routes'

import { navigateTo } from 'app-history'
import { userIsAdmin } from 'utils/role'

export default () => {
  const menuActions = [
    {
      text: 'About Us',
      handler: () => navigateTo(Routes.about.path),
    },
    {
      text: 'Terms & Conditions',
      handler: () => navigateTo(Routes.tcs.path),
    },
  ]

  if (userIsAdmin()) {
    return [
      {
        text: 'Dashboard',
        handler: () => navigateTo(Routes.admin.path),
      },
      ...menuActions,
    ]
  }

  return menuActions
}
