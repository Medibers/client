import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

const Price: React.FC<{ price: string }> = ({ price }) => {
  return (
    <IonRow>
      <IonCol className="ion-no-padding">
        <IonLabel>
          <h4>{price}</h4>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default Price
