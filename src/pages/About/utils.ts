import { platformIsMobile } from 'utils'
import { sendEmail } from 'utils/email'
import { callTelephone, formatUGMSISDN } from 'utils/msisdn'

import { ISupportContactListItem, ISupportContacts } from './types'

export const mapContactsToListItem = ({
  telephones,
  email,
  address,
}: ISupportContacts): ISupportContactListItem[] => {
  return [
    {
      header: 'Telephone numbers',
      description: telephones
        .map(line => `+${formatUGMSISDN(line)}`)
        .join(', '),
      action: platformIsMobile ? () => callTelephone(telephones[0]) : undefined,
    },
    {
      header: 'E-mail',
      description: email,
      action: platformIsMobile ? () => sendEmail(email) : undefined,
    },
    {
      header: 'Address',
      description: address.join('<br />'),
    },
  ]
}
