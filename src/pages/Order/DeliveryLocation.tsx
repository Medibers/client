import React, { useContext } from 'react'

import { IonItem, IonLabel } from '@ionic/react'
import { locationInfo } from './utils'

import Context from './context'

const DeliveryLocation: React.FC = () => {
  const { locationNotAvailable, onSelectDestination } = useContext(Context)

  return (
    <IonItem button onClick={onSelectDestination}>
      {locationNotAvailable ? (
        <IonLabel className="ion-text-wrap">
          <h4>{locationInfo().locationNotAvailable}</h4>
        </IonLabel>
      ) : (
        <IonLabel className="ion-text-wrap">
          <p>Delivery location</p>
          <h4 className="ion-label-primary">
            {locationInfo().deliveryAddress}
          </h4>
        </IonLabel>
      )}
    </IonItem>
  )
}

export default DeliveryLocation
