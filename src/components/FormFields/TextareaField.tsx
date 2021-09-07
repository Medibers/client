import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonTextarea } from '@ionic/react'

interface IProps {
  disabled?: boolean
  required?: boolean
  name: string
}

const TextareaField: React.FC<IProps> = ({ name, required, disabled }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <IonTextarea
          disabled={disabled}
          value={value}
          onIonChange={event => onChange(event.detail.value)}
        />
      )}
      rules={{
        validate: value => (required ? (value || '').trim().length > 0 : true),
      }}
    />
  )
}

export default TextareaField
