import React, { useContext } from 'react'
import { IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { send } from 'ionicons/icons'

import { redirectTo } from 'app-history'
import Routes from 'routes'

import Context from './context'

const SubmitButton = () => {
  const { selectedItems } = useContext(Context)

  if (!selectedItems.length) return null

  const onSubmit = () => {
    redirectTo(Routes.order.path, { selectedItems })
  }

  return (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonFabButton className="ion-action-primary" onClick={onSubmit}>
        <IonIcon icon={send} />
      </IonFabButton>
    </IonFab>
  )
}

export default SubmitButton
