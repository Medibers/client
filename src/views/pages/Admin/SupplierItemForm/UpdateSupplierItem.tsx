import React from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { pencil } from 'ionicons/icons'

import { ContentHeader, Header } from 'components'

import SupplierItemForm from './SupplierItemForm'

import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'

import Routes from 'routes'
import Requests, { endPoints } from 'requests'
import { goBack, navigateTo } from 'app-history'

import {
  hideLoading,
  setSearchResult,
  showLoading,
  showToast,
} from 'store/utils'

import SupplierItemDataWrapper from 'components/DataWrapper/SupplierItem'

interface IUpdateSupplierItem {
  item: ISupplierItem
}

const getToolbarActions = (supplierItemId: string) => {
  return [
    {
      icon: pencil,
      handler: () => {
        if (Routes['item-update'].getPath) {
          navigateTo(Routes['item-update'].getPath(supplierItemId))
        }
      },
    },
  ]
}

const UpdateSupplierItem: React.FC<IUpdateSupplierItem> = ({
  item: supplierItem,
}) => {
  const onSubmit = (values: ISupplierItemFormFields) => {
    showLoading()
    Requests.put<ISupplierItem[]>(
      endPoints.supplierItems(supplierItem.pharmacy._id, supplierItem._id),
      values
    )
      .then(([updatedSupplierItem]) => {
        showToast('Item details updated')
        setSearchResult(updatedSupplierItem)
        goBack()
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        showToast(error.error)
      })
      .finally(hideLoading)
  }

  return (
    <IonPage>
      <Header
        title={supplierItem.item.name}
        size="small"
        actions={getToolbarActions(supplierItem._id)}
      />
      <IonContent>
        <IonItem className="ion-no-margin" lines="none">
          <ContentHeader
            message={`Supplied by ${supplierItem.pharmacy.name}`}
          />
        </IonItem>
        <SupplierItemForm item={supplierItem} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default SupplierItemDataWrapper(
  UpdateSupplierItem,
  'supplier-item-update'
)
