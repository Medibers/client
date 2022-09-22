import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { IonButton, IonList } from '@ionic/react'

import { ICategory, ItemSearchResult } from 'types'
import { useGetUnits } from 'requests/hooks'

import { IItemFormFields, ILocationState } from './types'
import { getItemFormDefaultValues } from './utils'

import CategoriesDataWrapper from 'components/DataWrapper/Categories'
import ItemCategory from './FormFields/ItemCategory'
import ItemName from './FormFields/ItemName'
// import ItemDescription from './FormFields/ItemDescription'
import ItemSpecification from './FormFields/ItemSpecification'
import ItemUnit from './FormFields/ItemUnit'

import { getLocationState } from 'app-history'

import './ItemForm.scss'

interface IItemForm {
  result?: ItemSearchResult
  categories: ICategory[]
  disabled: boolean
  onSubmit: (values: IItemFormFields) => void
}

const ItemForm: React.FC<IItemForm> = ({
  onSubmit,
  categories,
  disabled,
  result,
}) => {
  const state = useMemo<ILocationState>(
    () => getLocationState() as ILocationState,
    []
  )

  const methods = useForm<IItemFormFields>({
    defaultValues: getItemFormDefaultValues({ ...state, ...result }),
  })

  const units = useGetUnits()[1]

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="item-form">
        <IonList className="ion-margin-vertical" lines="full">
          <ItemName disabled={disabled} />
          <ItemCategory disabled={disabled} categories={categories} />
          <ItemSpecification disabled={disabled} />
          <ItemUnit disabled={disabled} units={units} />
        </IonList>
        <IonButton
          className="ion-action-primary ion-margin-start"
          type="submit"
        >
          Submit
        </IonButton>
      </form>
      <CategoriesWrapper />
    </FormProvider>
  )
}

const CategoriesWrapper = CategoriesDataWrapper(() => <React.Fragment />)

const mapStateToProps = (state: ReducerState) => ({
  categories: state.App.categories || [],
})

export default connect(mapStateToProps)(ItemForm)
