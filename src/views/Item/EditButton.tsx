import React from 'react'
import { IonButton, IonFab } from '@ionic/react'

import { userIsAdmin } from 'utils/role'

import { ItemSearchResult as IItemSearchResult } from 'types'

import Routes from 'routes'
import { navigateTo } from 'app-history'
import { setSupplierItem } from 'store/utils'

interface IEditButton {
  result: IItemSearchResult
}

const EditButton: React.FC<IEditButton> = ({ result }) => {
  if (!userIsAdmin()) return null

  const onClick = () => {
    if (Routes['supplier-item-update'].getPath) {
      setSupplierItem(result)
      navigateTo(
        Routes['supplier-item-update'].getPath(result.pharmacy._id, result._id)
      )
    }
  }

  return (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonButton className="ion-action-primary" onClick={onClick}>
        Edit
      </IonButton>
    </IonFab>
  )
}

export default EditButton
