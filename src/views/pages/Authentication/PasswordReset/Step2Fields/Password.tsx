import React from 'react'

import { IonInput, IonItem, IonLabel } from '@ionic/react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormFieldError } from 'components'

const fieldName = 'password'

const Password: React.FC = () => {
  const { control, errors } = useFormContext()

  return (
    <React.Fragment>
      <IonItem>
        <IonLabel position="floating">
          Your new passsword <span className="ion-label-secondary">*</span>
        </IonLabel>
        <Controller
          control={control}
          name={fieldName}
          defaultValue=""
          render={({ value, onChange }) => (
            <IonInput
              type="text"
              value={value}
              onIonChange={event => onChange(event.detail.value)}
            />
          )}
          rules={{
            validate: value => value.trim().length > 6,
          }}
        />
      </IonItem>
      <FormFieldError
        error={
          errors[fieldName]
            ? 'Password should be at least 6 characters long'
            : ''
        }
      />
    </React.Fragment>
  )
}

export default Password
