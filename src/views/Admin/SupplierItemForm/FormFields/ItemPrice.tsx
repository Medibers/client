import React from 'react'
import { useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError, NumberField } from 'components/FormFields'

import { MIN_ITEM_PRICE } from '../utils'

const fieldName = 'price'

const Price: React.FC = () => {
  const { errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">
          Price <span className="ion-label-secondary">*</span>
        </IonLabel>
        <NumberField required name={fieldName} min={MIN_ITEM_PRICE} />
      </ListItem>
      <FormFieldError error={errors[fieldName] ? 'Price is required' : ''} />
    </React.Fragment>
  )
}

export default Price
