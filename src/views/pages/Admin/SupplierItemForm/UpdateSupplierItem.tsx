import React, { useMemo } from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { Header } from 'components'

import ContentHeader from '../ContentHeader'
import SupplierItemForm from './SupplierItemForm'

import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'
// import { ILocationState, ISupplierItemFormFields } from './types'

import Requests, { endPoints } from 'requests'
import { getLocationState, goBack } from 'app-history'

import { hideLoading, showLoading, showToast } from 'store/utils'

const UpdateSupplierItem: React.FC = () => {
  const supplierItem = useMemo(() => getLocationState<ISupplierItem>(), [])

  if (!supplierItem) return null

  const onSubmit = (values: ISupplierItemFormFields) => {
    showLoading()
    Requests.put(
      endPoints.supplierItems(supplierItem.pharmacy._id) +
        `/${supplierItem._id}`,
      values
    )
      .then(() => {
        showToast('Item details updated')
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
      <Header title={supplierItem.item.name} size="small" />
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

export default UpdateSupplierItem
