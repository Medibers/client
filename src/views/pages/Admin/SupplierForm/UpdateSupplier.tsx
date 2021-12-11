import React, { useState } from 'react'

import { ISupplier } from 'views/pages/Admin/types'
import { ISupplierFormFields } from './types'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import SupplierForm from './SupplierForm'

import Requests, { endPoints } from 'requests'

import Routes from 'routes'
import { redirectTo } from 'app-history'

import { setSupplier, showToast } from 'store/utils'
import SupplierDataWrapper from 'components/DataWrapper/Supplier'

interface IUpdateSupplier {
  supplier: ISupplier
}

const UpdateSupplier: React.FC<IUpdateSupplier> = ({ supplier }) => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values: ISupplierFormFields) => {
    setSubmitting(true)
    Requests.put<ISupplier[]>(`${endPoints.suppliers}/${supplier._id}`, values)
      .then(([updatedSupplier]) => {
        showToast('Supplier details updated')
        setSupplier(updatedSupplier)
        redirectTo(Routes.suppliers.path)
      })
      .catch(error => {
        setSubmitting(false)
        console.error(error) // eslint-disable-line
      })
  }

  return (
    <IonPage>
      <Header title="Edit Supplier" size="small" />
      <IonContent className="ion-padding ion-margin-top">
        <SupplierForm
          disabled={submitting}
          supplier={supplier}
          onSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  )
}

export default SupplierDataWrapper(UpdateSupplier, 'supplier-update')
