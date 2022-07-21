import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

import { getItemState } from 'utils'

const Available: React.FC<{ available: boolean }> = ({ available }) => {
  return available ? null : (
    <IonRow>
      <IonCol className="ion-no-padding">
        <IonLabel className="ion-label-secondary">
          <h4>{getItemState(false)}</h4>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default Available
