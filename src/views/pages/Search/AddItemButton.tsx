import React, { useContext } from 'react'
import { IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { add } from 'ionicons/icons'

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
      <IonFabButton className="ion-action-primary" onClick={onSubmit}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  )
}

export default AddItemButton
