import React from 'react'

import { IonButton, IonContent, IonLabel, IonPage } from '@ionic/react'

import { Header } from 'components'
import { goBack } from 'app-history'

const NotAuthorized: React.FC = () => (
  <IonPage>
    <Header size="small" title="Not Authorized" />
    <IonContent className="ion-padding">
      <IonLabel>You are not authorized to view this page</IonLabel>
      <IonButton className="ion-action-primary ion-margin-top" onClick={goBack}>
        Go Back
      </IonButton>
    </IonContent>
  </IonPage>
)

export default NotAuthorized
