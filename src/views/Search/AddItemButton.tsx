import React, { useContext } from 'react'
import { IonButton, IonFab } from '@ionic/react'

import { navigateTo } from 'app-history'
import Routes from 'routes'

import Context from './context'

const AddItemButton = () => {
  const { selectedCategory } = useContext(Context)

  const onSubmit = () => {
    navigateTo(Routes['item-add'].path, { selectedCategory })
  }

  return (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonButton className="ion-action-primary" onClick={onSubmit}>
        Register New Item
      </IonButton>
    </IonFab>
  )
}

export default AddItemButton
