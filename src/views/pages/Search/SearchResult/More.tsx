import React from 'react'
import { IonCol, IonLabel, IonRow } from '@ionic/react'

interface IMore {
  userIsClientUser: boolean
  onClick: (a: React.MouseEvent, b: string) => void
}

const More: React.FC<IMore> = ({ userIsClientUser, onClick }) => {
  return userIsClientUser ? (
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
  ) : null
}

export default More
