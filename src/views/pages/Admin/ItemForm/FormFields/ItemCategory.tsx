import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError, SelectField } from 'components/FormFields'

import { ICategory } from '../types'
import { mapEntitiesToSelectOptions } from 'views/pages/Admin/utils'

interface IProps {
  disabled: boolean
  categories: ICategory[]
}

const fieldName = 'category'

const Category: React.FC<IProps> = ({ disabled, categories }) => {
  const { errors } = useFormContext()

  const options = useMemo(
    () => mapEntitiesToSelectOptions(categories),
    [categories.length] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">
          Select Category <span className="ion-label-secondary">*</span>
        </IonLabel>
        <SelectField
          disabled={disabled}
          required
          name={fieldName}
          options={options}
        />
      </ListItem>
      <FormFieldError
        error={errors[fieldName] ? "Please select the item's category" : ''}
      />
    </React.Fragment>
  )
}

export default Category
