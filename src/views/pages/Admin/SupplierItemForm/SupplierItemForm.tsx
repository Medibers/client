import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { IonButton, IonList } from '@ionic/react'

import { ISupplierItem } from '../types'
import { ISupplierItemFormFields } from './types'
import { getItemFormDefaultValues } from './utils'

import Item from './FormFields/Item'
import ItemPrice from './FormFields/ItemPrice'
import ItemImages from './FormFields/ItemImages'

const listStyle = { contain: 'unset' }

interface IItemForm {
  item?: ISupplierItem
  onSubmit: (values: ISupplierItemFormFields) => void
}

const SupplierItemForm: React.FC<IItemForm> = ({ onSubmit, item }) => {
  const methods = useForm<ISupplierItemFormFields>({
    defaultValues: getItemFormDefaultValues(item),
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="ion-margin-bottom ion-margin-horizontal"
      >
        <IonList lines="full" style={listStyle}>
          {item ? null : <Item />}
          <ItemPrice />
          <ItemImages />
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

export default SupplierItemForm
