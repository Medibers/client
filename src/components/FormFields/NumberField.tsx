import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonInput } from '@ionic/react'

interface IProps {
  disabled?: boolean
  required?: boolean
  min?: number
  name: string
}

const NumberField: React.FC<IProps> = ({
  name,
  min = -1,
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
          type="number"
          value={value}
          onIonChange={event => onChange(Number(event.detail.value))}
        />
      )}
      rules={{
        validate: value => (required ? Number(value) > min : true),
      }}
    />
  )
}

export default NumberField
