import React, { useMemo, useState } from 'react'

import { ISupplier } from 'views/pages/Admin/types'
import { ISupplierFormFields } from './types'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import SupplierForm from './SupplierForm'

import Requests, { endPoints } from 'requests'

import Routes from 'routes'
import { redirectTo } from 'app-history'

import { showToast } from 'store/utils'
import { getLocationState } from 'app-history'

const UpdateSupplier: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)

  const supplier = useMemo(() => getLocationState<ISupplier>(), [])

  const onSubmit = (values: ISupplierFormFields) => {
    setSubmitting(true)
    Requests.put(`${endPoints.suppliers}/${supplier._id}`, values)
      .then(() => {
        setSubmitting(false)
        showToast('Supplier details updated')
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

export default UpdateSupplier
