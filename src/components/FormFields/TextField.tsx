import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonInput } from '@ionic/react'

interface IProps {
  disabled?: boolean
  required?: boolean
  placeholder?: string
  name: string
}

const TextField: React.FC<IProps> = ({
  name,
  placeholder,
  required,
  disabled,
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <IonInput
          disabled={disabled}
          placeholder={placeholder}
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

export default TextField
