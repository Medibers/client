import React from 'react'
import { IonInput, IonLabel } from '@ionic/react'
import { Controller, useFormContext } from 'react-hook-form'
import { isEmail } from 'utils'
import { FormFieldError, ListItem } from 'components'

const fieldName = 'email'

const SupplierEmail: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const { control, errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">Email</IonLabel>
        <Controller
          control={control}
          name={fieldName}
          render={({ onChange, value }) => (
            <IonInput
              type="email"
              value={value}
              disabled={disabled}
              onIonChange={event => onChange(event.detail.value)}
            />
          )}
          rules={{
            validate: value => (value ? isEmail(value) : true),
          }}
        />
      </ListItem>
      <FormFieldError error={errors[fieldName] ? 'Email not valid' : ''} />
    </React.Fragment>
  )
}

export default SupplierEmail
