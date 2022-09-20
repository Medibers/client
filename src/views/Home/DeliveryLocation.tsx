import React from 'react'

import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { locationSharp as locationIcon } from 'ionicons/icons'

import { getDeliveryAddressForNextOrder } from 'location'
import { navigateTo } from 'app-history'

import Routes from 'routes'
import getPageText from 'text'

const Text = getPageText('home')

const onChangeDeliveryLocation = () => {
  navigateTo(Routes.location.path)
}

const DeliveryLocation = () => (
  <IonItem lines="none" onClick={onChangeDeliveryLocation} button>
    <IonIcon
      slot="start"
      icon={locationIcon}
      className="ion-icon-primary"
      size="large"
    />
    <IonLabel>
      <p>{Text['delivery-to']}</p>
      <h3 className="ion-label-primary">
        {getDeliveryAddressForNextOrder('Not known yet')}
      </h3>
    </IonLabel>
  </IonItem>
)

export default DeliveryLocation
