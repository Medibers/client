import { EmailComposer } from '@ionic-native/email-composer'
import { APP_NAME } from 'utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async (email: string): Promise<any> => {
  return EmailComposer.open({
    subject: APP_NAME + ' service enquiry',
    to: email,
  })
}
