import React, { useContext } from 'react'

import { IonButton, IonIcon, IonLabel } from '@ionic/react'
import { close } from 'ionicons/icons'
import { ListItem } from 'components'

import { ISupplierItem } from 'views/pages/Admin/types'

import Routes from 'routes'

import { navigateTo } from 'app-history'

import { SupplierContext } from './Supplier'
import { setSupplierItem } from 'store/utils'

interface ISupplierListItem {
  supplierItem: ISupplierItem
  isLast?: boolean
}

const SupplierListItem: React.FC<ISupplierListItem> = ({
  supplierItem,
  isLast,
}) => {
  const handleClick = () => {
    if (Routes['supplier-item-update'].getPath) {
      setSupplierItem(supplierItem)
      navigateTo(
        Routes['supplier-item-update'].getPath(
          supplierItem.pharmacy._id,
          supplierItem._id
        )
      )
    }
  }

  const { setItemToDelete } = useContext(SupplierContext)

  // eslint-disable-next-line no-undef
  const onRemove = async (event: React.MouseEvent<HTMLIonButtonElement>) => {
    event.stopPropagation()
    setItemToDelete(supplierItem)
  }

  return (
    <ListItem button onClick={handleClick} isLast={isLast}>
      <IonLabel>
        <h4 className="ion-label-primary">{supplierItem.item.name}</h4>
        <p>{supplierItem.item.specification.join(', ')}</p>
      </IonLabel>
      <IonButton slot="end" fill="clear" onClick={onRemove}>
        <IonIcon color="primary" icon={close} />
      </IonButton>
    </ListItem>
  )
}

export default SupplierListItem
