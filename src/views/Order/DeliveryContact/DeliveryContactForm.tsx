import React, { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { IonButton, IonIcon, IonList } from '@ionic/react'
import { send } from 'ionicons/icons'

import { ListItem, PhoneInput } from 'components'

import { formatUGMSISDN, parseUGSN } from 'utils/msisdn'

import 'styles'

interface IDeliveryContactFormProps {
  onSubmit: (a: string) => void
}

interface IDeliveryContactFormFields {
  phone: string
}

const DeliveryContactForm: React.FC<IDeliveryContactFormProps> = ({
  onSubmit: parentOnSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IDeliveryContactFormFields>()

  const onSubmit = ({ phone }: IDeliveryContactFormFields) => {
    try {
      parentOnSubmit(formatUGMSISDN(phone))
    } catch (error) {
      setError('phone', { message: error.message })
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <form className="delivery-contact-form" onSubmit={handleSubmit(onSubmit)}>
      <IonList lines="full" color="primary">
        <ListItem className={errors.phone && 'errored'}>
          <Controller
            control={control}
            name="phone"
            defaultValue=""
            render={({ value, onChange }) => (
              <PhoneInput
                value={value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange(event.target.value)
                }
              />
            )}
            rules={{
              validate: value => Boolean(parseUGSN(value)),
            }}
          />
        </ListItem>
        <ListItem isLast>
          <IonButton type="submit" color="primary">
            <IonIcon icon={send} />
          </IonButton>
        </ListItem>
      </IonList>
    </form>
  )
}

export default DeliveryContactForm
