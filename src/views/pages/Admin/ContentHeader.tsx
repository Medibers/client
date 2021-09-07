import React from 'react'
import { IonLabel } from '@ionic/react'

const ContentHeader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <IonLabel>
      <h4 className="italicize">{message}</h4>
    </IonLabel>
  )
}

export default ContentHeader
