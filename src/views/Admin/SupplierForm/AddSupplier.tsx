import React, { useState } from 'react'

import { ISupplierFormFields } from './types'

import { IonContent, IonPage } from '@ionic/react'
import { ContentHeader, Header } from 'components'

import SupplierForm from './SupplierForm'

import Requests, { endPoints } from 'requests'

import Routes from 'routes'
import { redirectTo } from 'app-history'

import { showToast } from 'store/utils'

const AddSupplier: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values: ISupplierFormFields) => {
    setSubmitting(true)
    Requests.post(endPoints.suppliers, values)
      .then(() => {
        showToast('Supplier registered')
        redirectTo(Routes.suppliers.path)
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        setSubmitting(false)
      })
  }

  return (
    <IonPage>
      <Header title="New Supplier" size="small" />
      <IonContent className="ion-padding ion-margin-top">
        <ContentHeader message="Please provide supplier details" />
        <SupplierForm disabled={submitting} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default AddSupplier
