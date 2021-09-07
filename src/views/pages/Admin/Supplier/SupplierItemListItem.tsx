import React from 'react'

import { IonLabel } from '@ionic/react'
import { ListItem } from 'components'

import { ISupplierItem } from 'views/pages/Admin/types'

import Routes from 'routes'

import { navigateTo } from 'app-history'

interface ISupplierListItem {
  supplierItem: ISupplierItem
  isLast?: boolean
}

const SupplierListItem: React.FC<ISupplierListItem> = ({
  supplierItem,
  isLast,
}) => {
  const handleClick = () => {
    navigateTo(Routes['supplier-item-update'].path, supplierItem)
  }

  return (
    <ListItem button onClick={handleClick} isLast={isLast}>
      <IonLabel>
        <h4 className="ion-label-primary">{supplierItem.item.name}</h4>
        <p>{supplierItem.item.description}</p>
      </IonLabel>
    </ListItem>
  )
}

export default SupplierListItem
