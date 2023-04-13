import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

const Price: React.FC<{ price: string }> = ({ price }) => (
  <IonRow className="price">
    <IonCol className="ion-no-padding">
      <IonLabel className="no-wrap">
        <h4>{price}</h4>
      </IonLabel>
    </IonCol>
  </IonRow>
)

export default Price
