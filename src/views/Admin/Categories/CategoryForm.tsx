import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { IonButton, IonList } from '@ionic/react'

import { ICategory } from 'types'
import { ICategoryFormFields } from './types'
import { getItemFormDefaultValues } from './utils'

import ImagesField from 'components/FormFields/ImagesField'
import CategoryName from './FormFields/CategoryName'

interface IItemForm {
  disabled: boolean
  category?: ICategory
  onSubmit: (values: ICategoryFormFields) => void
}

const listStyle = { contain: 'unset' }

const CategoryForm: React.FC<IItemForm> = ({
  disabled,
  category,
  onSubmit,
}) => {
  const methods = useForm<ICategoryFormFields>({
    defaultValues: getItemFormDefaultValues(category),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <IonList lines="full" style={listStyle}>
          <CategoryName disabled={disabled} />
          <ImagesField disabled={disabled} label="Image" name="image" />
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

export default CategoryForm
