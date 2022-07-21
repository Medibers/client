import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

interface IMore {
  onClick: (a: React.MouseEvent, b: string) => void
}

const More: React.FC<IMore> = ({ onClick }) => {
  return (
    <IonRow>
      <IonCol className="ion-no-padding ion-padding-top">
        <IonLabel
          onClick={e => onClick(e, 'more')}
          className="ion-label-primary flex-inline"
        >
          <h4>
            <b>More</b>
          </h4>
        </IonLabel>
      </IonCol>
    </IonRow>
  )
}

export default More
