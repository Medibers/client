import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { IonButton, IonList } from '@ionic/react'

import { ISupplier } from 'views/pages/Admin/types'
import { ISupplierFormFields } from './types'
import { getItemFormDefaultValues } from './utils'

import SupplierName from './FormFields/SupplierName'
import SupplierPhone from './FormFields/SupplierPhone'
import SupplierEmail from './FormFields/SupplierEmail'
import SupplierAddress from './FormFields/SupplierAddress'

interface IItemForm {
  disabled: boolean
  supplier?: ISupplier
  onSubmit: (values: ISupplierFormFields) => void
}

const listStyle = { contain: 'unset' }

const SupplierForm: React.FC<IItemForm> = ({
  disabled,
  supplier,
  onSubmit,
}) => {
  const methods = useForm<ISupplierFormFields>({
    defaultValues: getItemFormDefaultValues(supplier),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <IonList className="ion-margin-vertical" lines="full" style={listStyle}>
          <SupplierName disabled={disabled} />
          <SupplierPhone disabled={disabled} />
          <SupplierEmail disabled={disabled} />
          <SupplierAddress disabled={disabled} />
        </IonList>
        <IonButton
          className="ion-action-primary ion-margin-start"
          type="submit"
        >
          Submit
        </IonButton>
      </form>
    </FormProvider>
  )
}

export default SupplierForm
