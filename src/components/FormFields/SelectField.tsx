import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonSelect, IonSelectOption } from '@ionic/react'

interface ISelectOption {
  label: string
  value: string
}

interface IProps {
  disabled?: boolean
  required?: boolean
  name: string
  options: ISelectOption[]
}

const SelectField: React.FC<IProps> = ({
  name,
  required,
  disabled,
  options,
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <IonSelect
          disabled={disabled}
          interface="popover"
          interfaceOptions={{
            showBackdrop: false,
            cssClass: 'unlimited-width-popover',
          }}
          value={value}
          onIonChange={event => onChange(event.detail.value)}
        >
          {options.map(({ label, value }) => (
            <IonSelectOption key={value} value={value}>
              {label}
            </IonSelectOption>
          ))}
        </IonSelect>
      )}
      rules={{
        validate: value => (required ? (value || '').trim().length > 0 : true),
      }}
    />
  )
}

export default SelectField
