import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

const Specification: React.FC<{ specification: string[] }> = ({
  specification,
}) => {
  return (
    <IonRow>
      <IonCol className="ion-no-padding">
        <IonLabel>
          <p>
            {specification.map(
              (text, i, a) => `${text}${a.length - 1 === i ? '' : ', '}`
            )}
          </p>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default Specification
