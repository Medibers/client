/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { addCircleOutline as add } from 'ionicons/icons'
import { pencil as edit } from 'ionicons/icons'

import SupplierItemList from './SupplierItemList'

import {
  ContentHeader,
  Alert as DeleteConfirmationAlert,
  Header,
} from 'components'

import Requests, { endPoints } from 'requests'
import Routes from 'routes'
import { navigateTo } from 'app-history'

import { useGetSupplierItems } from 'views/pages/Admin/hooks'
import { ISupplier, ISupplierItem } from 'views/pages/Admin/types'
import SupplierDataWrapper from 'components/DataWrapper/Supplier'

const getCountText = (count: number, supplier: string) => {
  return count > 0
    ? `${count} item${count > 1 ? 's' : ''} registered`
    : 'No items registered for ' + supplier
}

const getToolbarActions = (supplier: ISupplier) => [
  {
    icon: add,
    handler: () => {
      navigateTo(Routes['supplier-item-add'].path, supplier)
    },
  },
  {
    icon: edit,
    handler: () => {
      if (Routes['supplier-update'].getPath) {
        navigateTo(Routes['supplier-update'].getPath(supplier._id))
      }
    },
  },
]

interface ISupplierProps {
  supplier: ISupplier
}

interface ISupplierContext {
  items: ISupplierItem[]
  setItemToDelete: (item: ISupplierItem) => void
}

export const SupplierContext = React.createContext({} as ISupplierContext)

const getDeleteConfirmationMessage = (supplierItem?: ISupplierItem) =>
  `${
    supplierItem ? supplierItem.item.name : 'Item'
  } will no longer be listed under ${
    supplierItem ? supplierItem.pharmacy.name : 'this supplier'
  }`

const Supplier: React.FC<ISupplierProps> = ({ supplier }) => {
  const [fetching, data = []] = useGetSupplierItems(supplier._id)
  const [items, setItems] = useState<ISupplierItem[]>([])
  const [itemToDelete, setItemToDelete] = useState<ISupplierItem>()

  const countText = getCountText(items.length, supplier.name)

  useEffect(() => setItems(data), [data])

  const contextValue = { items, setItemToDelete }

  const handleDelete = async () => {
    if (itemToDelete) {
      await Requests.delete(
        endPoints.supplierItems(itemToDelete.pharmacy._id, itemToDelete._id)
      )
      setItems(items.filter(({ _id }) => _id !== itemToDelete._id))
      setItemToDelete(undefined)
    }
  }

  const deleteConfirmationTitle = 'Confirm Deletion'
  const deleteConfirmationMessage = getDeleteConfirmationMessage(itemToDelete)

  return (
    <IonPage>
      <Header
        title={supplier.name}
        actions={getToolbarActions(supplier)}
        size="small"
      />
      <IonContent>
        <IonItem className="ion-no-margin" lines="none">
          <ContentHeader message={countText} />
        </IonItem>
        {fetching ? null : (
          <SupplierContext.Provider value={contextValue}>
            <SupplierItemList />
          </SupplierContext.Provider>
        )}
      </IonContent>
      <DeleteConfirmationAlert
        open={Boolean(itemToDelete)}
        header={deleteConfirmationTitle}
        message={deleteConfirmationMessage}
        onDismiss={() => setItemToDelete(undefined)}
        buttons={[
          {
            text: 'Delete',
            handler: handleDelete,
            cssClass: 'ion-label-secondary',
          },
        ]}
      />
    </IonPage>
  )
}

export default SupplierDataWrapper(Supplier, 'supplier')
