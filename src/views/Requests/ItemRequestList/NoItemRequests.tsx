import React from 'react'

import { IonLabel } from '@ionic/react'

import { userIsClientUser } from 'utils/role'

const NoRequests: React.FC = () => {
  const placeholderText = userIsClientUser()
    ? 'Your orders will show here'
    : 'Orders will appear here'

  return (
    <div className="ion-padding">
      <IonLabel>
        <p>{placeholderText}</p>
      </IonLabel>
    </div>
  )
}

export default NoRequests
