import { formatMoney } from 'utils/currency'
import { getDeliveryAddressForNextOrder } from 'location'

import { Text } from 'text'

const text = Text['order']

export const locationInfo = () => ({
  deliveryAddress:
    getDeliveryAddressForNextOrder() || text['alternate-delivery-address'],
  locationNotAvailable: text['select-destination'],
  locationNotAvailableDetailed: text['ensure-these-find-location'],
})

export const AlertText: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (e?: any) => {
    header: string
    message: string
    buttonText?: string
  }
} = {
  'payment-succeeded': (credits: number) => ({
    header: 'Payment succeeded',
    message: `<ion-label>
      <p>${formatMoney(credits)} has been added to your wallet</p>
    </ion-label>`,
  }),
  'payment-errored': () => ({
    header: 'Payment failed',
    message: `<ion-label>
      <p>Please try again</p>
      <p>Ensure your account is eligible to be deducted the desired amount</p>
    </ion-label>`,
  }),
  confirmation: (single: boolean) => ({
    header: 'Confirm your order',
    message: `<ion-label>
      <p>We will contact you shortly after to deliver your ${
        single ? 'item' : 'items'
      }</p>
    </ion-label>`,
    buttonText: 'Confirm',
  }),
}
