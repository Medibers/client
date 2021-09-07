import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

const Description: React.FC<{ description: string[] }> = ({ description }) => {
  return (
    <IonRow>
      <IonCol className="ion-no-padding">
        <IonLabel>
          <p>
            {description.map(
              (text, i, a) => `${text}${a.length - 1 === i ? '' : ', '}`
            )}
          </p>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default Description
