import React from 'react'

import { IonButton, IonIcon, IonLabel } from '@ionic/react'
import { ellipsisHorizontal } from 'ionicons/icons'
import { ListItem, Menu } from 'components'

import { ISupplier } from 'views/pages/Admin/types'

import Routes from 'routes'

import { getLocationState, navigateTo } from 'app-history'
import { showMenu } from 'store/utils'

interface ISupplierListItem {
  supplier: ISupplier
  isLast?: boolean
}

const SupplierListItem: React.FC<ISupplierListItem> = ({
  supplier,
  isLast,
}) => {
  const handleOverallClick = () => {
    navigateTo(Routes.supplier.path, supplier)
  }

  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    showMenu(event.nativeEvent, supplier._id)
  }

  const menuActions = [
    {
      text: 'Register Item Supplied',
      handler: () => {
        const supplier = getLocationState<ISupplier>()
        navigateTo(Routes['supplier-item-add'].path, supplier)
      },
    },
    {
      text: 'Edit Supplier',
      handler: () => {
        const supplier = getLocationState<ISupplier>()
        navigateTo(Routes['supplier-update'].path, supplier)
      },
    },
  ]

  return (
    <React.Fragment>
      <ListItem button onClick={handleOverallClick} isLast={isLast}>
        <IonLabel>
          <h4 className="ion-label-primary">{supplier.name}</h4>
          <p>{supplier.address}</p>
        </IonLabel>
        <IonButton onClick={handleMoreClick} slot="end" fill="clear">
          <IonIcon icon={ellipsisHorizontal} />
        </IonButton>
      </ListItem>
      <Menu menuId={supplier._id} actions={menuActions} />
    </React.Fragment>
  )
}

export default SupplierListItem
