import Routes from 'routes'

import { navigateTo } from 'app-history'

export default () => [
  {
    text: 'About Us',
    handler: () => navigateTo(Routes.about.path),
  },
  {
    text: 'Terms & Conditions',
    handler: () => navigateTo(Routes.tcs.path),
  },
]
