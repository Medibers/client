import React from 'react'

import { IonBadge, IonIcon } from '@ionic/react'
import { close } from 'ionicons/icons'

import { formatUGMSISDN } from 'utils/msisdn'

import { IOrderDeliveryContact } from '../types'

interface IDeliveryContactBadgeProps {
  contact: IOrderDeliveryContact
  onRemoveContact: (a: string) => void
  showCloseButton: boolean
}

const DeliveryContactBadge: React.FC<IDeliveryContactBadgeProps> = ({
  contact,
  onRemoveContact,
  showCloseButton,
}) => {
  const onRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    onRemoveContact(contact.phone)
  }
  return (
    <IonBadge
      className={`delivery-contact-badge ${showCloseButton ? '' : 'no-close'}`}
    >
      <h3>{formatUGMSISDN(contact.phone)}</h3>
      {showCloseButton ? (
        <IonIcon icon={close} color="secondary" onClick={onRemove} />
      ) : null}
    </IonBadge>
  )
}

export default DeliveryContactBadge
