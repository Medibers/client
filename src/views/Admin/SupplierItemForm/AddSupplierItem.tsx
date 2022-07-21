import React, { useMemo } from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { ContentHeader, Header } from 'components'

import SupplierItemForm from './SupplierItemForm'

// import { ILocationState, ISupplierItemFormFields } from './types'
import { ISupplierItemFormFields } from './types'
import { ISupplier } from '../types'

import Requests, { endPoints } from 'requests'
import { hideLoading, showLoading, showToast } from 'store/utils'

import { getLocationState, goBack } from 'app-history'

const AddSupplierItem: React.FC = () => {
  const supplier = useMemo(() => getLocationState<ISupplier>(), [])

  const onSubmit = (values: ISupplierItemFormFields) => {
    showLoading()
    Requests.post(endPoints.supplierItems(supplier._id), values)
      .then(() => {
        showToast('Item added to market')
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
      <Header title="New Item" size="small" />
      <IonContent className="ion-no-margin">
        <IonItem className="ion-no-margin" lines="none">
          <ContentHeader
            message={`Please provide item details. After submit, the item will be added
              to market under ${supplier.name}`}
          />
        </IonItem>
        <SupplierItemForm onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default AddSupplierItem
