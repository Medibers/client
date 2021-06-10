import { IonItem, IonLabel } from '@ionic/react'
import React from 'react'

const HeadComponent: React.FC<{
  header: string
  subHeader: string
}> = ({ header, subHeader }) => (
  <>
    <IonItem lines="none" className="ion-margin-bottom">
      <IonLabel className="ion-text-wrap ion-head">
        {/* <h1>{header}</h1> */}
        <p>{subHeader}</p>
      </IonLabel>
    </IonItem>
    {/* <IonItemDivider className="ion-margin-vertical" style={{
    minHeight: .4,
    '--background': 'var(--ion-color-label-secondary)'
  }} /> */}
  </>
)

export default HeadComponent
