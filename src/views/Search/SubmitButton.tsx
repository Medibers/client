import React, { useContext } from 'react'
import { IonButton, IonFab } from '@ionic/react'

import Routes from 'routes'
import { navigateTo } from 'app-history'

import Context from './context'

const SubmitButton = () => {
  const { selectedItems } = useContext(Context)

  if (!selectedItems.length) return null

  const onSubmit = () => navigateTo(Routes.order.path)

  return (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonButton className="ion-action-primary" onClick={onSubmit}>
        Make Order
      </IonButton>
    </IonFab>
  )
}

export default SubmitButton
