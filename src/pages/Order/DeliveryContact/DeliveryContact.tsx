import React, { useContext, useState } from 'react'

import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
import { add } from 'ionicons/icons'

import { Popover } from 'components'

import { showToast } from 'store/utils'

import DeliveryContactBadge from './DeliveryContactBadge'
import DeliveryContactForm from './DeliveryContactForm'

import Context from '../context'

import './styles.scss'

const DeliveryContact: React.FC = () => {
  const { contacts, onSetContacts: setContacts } = useContext(Context)
  const [popoverShown, setPopoverShown] = useState(false)

  const onRemoveContact = (contactId: string) => {
    if (contacts.length > 1) {
      const newContacts = [...contacts]
      const spliceFrom = newContacts
        .map(({ phone: contactId }) => contactId)
        .indexOf(contactId)
      newContacts.splice(spliceFrom, 1)
      setContacts(newContacts)
    } else {
      showToast('Order should have a delivery contact')
    }
  }

  const onAddContact = (contactId: string) => {
    const index = contacts
      .map(({ phone: contactId }) => contactId)
      .indexOf(contactId)
    if (index < 0) {
      setContacts([...contacts, { phone: contactId }])
    }
    setPopoverShown(false)
  }

  const onShowPopover = () => setPopoverShown(true)
  const onDismissPopover = () => setPopoverShown(false)

  return (
    <React.Fragment>
      <IonItem button onClick={onShowPopover} className="self">
        <IonLabel className="ion-text-wrap">
          <p>Delivery contact</p>
          <h4 className="ion-label-primary">
            {contacts.map(contact => (
              <DeliveryContactBadge
                key={contact.phone}
                contact={contact}
                onRemoveContact={onRemoveContact}
                showCloseButton={contacts.length > 1}
              />
            ))}
          </h4>
        </IonLabel>
        <IonButton color="secondary" slot="end">
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
      <Popover open={popoverShown} onDismiss={onDismissPopover}>
        <DeliveryContactForm onSubmit={onAddContact} />
      </Popover>
    </React.Fragment>
  )
}

export default DeliveryContact
