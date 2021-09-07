import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { IonButton, IonList } from '@ionic/react'

import { IItem } from 'types'
import { IItemFormFields, ILocationState } from './types'
import { getItemFormDefaultValues } from './utils'

import ItemCategory from './FormFields/ItemCategory'
import ItemName from './FormFields/ItemName'
import ItemDescription from './FormFields/ItemDescription'
import ItemSpecifications from './FormFields/ItemSpecifications'
import ItemUnit from './FormFields/ItemUnit'

import { useGetCategories, useGetUnits } from './hooks'

import { getLocationState } from 'app-history'

interface IItemForm {
  item?: IItem
  disabled: boolean
  onSubmit: (values: IItemFormFields) => void
}

const ItemForm: React.FC<IItemForm> = ({ onSubmit, disabled, item }) => {
  const state = useMemo<ILocationState>(
    () => getLocationState() as ILocationState,
    []
  )

  const methods = useForm<IItemFormFields>({
    defaultValues: getItemFormDefaultValues(state),
  })

  const categories = useGetCategories()
  const units = useGetUnits()[1]

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <IonList className="ion-margin-vertical" lines="full">
          <ItemCategory disabled={disabled} categories={categories} />
          <ItemName disabled={disabled} />
          <ItemDescription disabled={disabled} />
          <ItemSpecifications disabled={disabled} />
          <ItemUnit disabled={disabled} units={units} />
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

export default ItemForm
