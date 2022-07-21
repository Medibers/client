import React from 'react'
import { useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError, SelectField } from 'components/FormFields'

import { mapEntitiesToSelectOptions } from 'views/Admin/utils'

import { IUnit } from '../types'

interface IProps {
  disabled: boolean
  units: IUnit[]
}

const fieldName = 'unit'

const Unit: React.FC<IProps> = ({ units, disabled }) => {
  const { errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem isLast>
        <IonLabel position="stacked">
          Unit of Count <span className="ion-label-secondary">*</span>
        </IonLabel>
        <SelectField
          required
          disabled={disabled}
          name={fieldName}
          options={mapEntitiesToSelectOptions(
            units.map(o => ({
              ...o,
              name: o.plural,
            }))
          )}
        />
      </ListItem>
      <FormFieldError error={errors[fieldName] ? 'Unit is required' : ''} />
    </React.Fragment>
  )
}

export default Unit
