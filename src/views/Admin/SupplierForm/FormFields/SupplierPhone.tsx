import React from 'react'
import { IonInput, IonLabel } from '@ionic/react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldError, ListItem } from 'components'

const getPhonesFromRawInput = (value: string) =>
  value.split(',').map(value => value.trim())

const validate = (values: string[]): boolean =>
  // @ts-ignore
  values.reduce(
    // @ts-ignore
    (a, value) => a && value.trim().length === 10 && parseInt(value),
    Boolean(values.length)
  )

const fieldName = 'phones'

const SupplierPhone: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const { control, errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem className="ion-margin-top">
        <IonLabel position="stacked">
          Telephone <span className="ion-label-secondary">*</span>
        </IonLabel>
        <Controller
          control={control}
          name={fieldName}
          render={({ onChange, value }) => (
            <IonInput
              placeholder="0777000000, 0707000000"
              value={value.join(', ')}
              disabled={disabled}
              onIonChange={event =>
                onChange(getPhonesFromRawInput(event.detail.value || ''))
              }
            />
          )}
          rules={{
            validate,
          }}
        />
      </ListItem>
      <FormFieldError
        error={
          errors[fieldName]
            ? 'Phone numbers should match "0777000000" format'
            : ''
        }
      />
    </React.Fragment>
  )
}

export default SupplierPhone
