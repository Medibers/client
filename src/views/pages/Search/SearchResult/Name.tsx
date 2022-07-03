import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

const Name: React.FC<{ name: string }> = ({ name }) => {
  return (
    <IonRow>
      <IonCol className="ion-no-padding">
        <IonLabel className="wrap">
          <h2 className="ion-label-primary">{name}</h2>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default Name
