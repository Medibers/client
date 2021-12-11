import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { IonButton, IonList } from '@ionic/react'

import { ItemSearchResult } from 'types'
import { IItemFormFields, ILocationState } from './types'
import { getItemFormDefaultValues } from './utils'

import ItemCategory from './FormFields/ItemCategory'
import ItemName from './FormFields/ItemName'
// import ItemDescription from './FormFields/ItemDescription'
import ItemSpecifications from './FormFields/ItemSpecifications'
import ItemUnit from './FormFields/ItemUnit'

import { useGetCategories, useGetUnits } from './hooks'

import { getLocationState } from 'app-history'

interface IItemForm {
  result?: ItemSearchResult
  disabled: boolean
  onSubmit: (values: IItemFormFields) => void
}

const ItemForm: React.FC<IItemForm> = ({ onSubmit, disabled, result }) => {
  const state = useMemo<ILocationState>(
    () => getLocationState() as ILocationState,
    []
  )

  const methods = useForm<IItemFormFields>({
    defaultValues: getItemFormDefaultValues({ ...state, ...result }),
  })

  const categories = useGetCategories()
  const units = useGetUnits()[1]

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <IonList className="ion-margin-vertical" lines="full">
          <ItemName disabled={disabled} />
          <ItemCategory disabled={disabled} categories={categories} />
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
