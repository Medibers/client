import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError, NumberField, SelectField } from 'components/FormFields'
import { useCurrencies } from '../hooks'
import { mapEntitiesToSelectOptions } from 'views/Admin/utils'

import { MIN_ITEM_PRICE } from '../utils'

import './ItemPrice.css'

const priceFieldName = 'price'
const currencyFieldName = 'currency'

interface IPrice {
  disabled?: boolean
}

const Price: React.FC<IPrice> = ({ disabled }) => {
  const { errors, getValues, setValue } = useFormContext()

  const currencyOptions = mapEntitiesToSelectOptions(useCurrencies()[1])

  useEffect(() => {
    if (currencyOptions.length === 0) return
    if (!getValues(currencyFieldName))
      setValue(currencyFieldName, currencyOptions[0].value)
  }, [currencyOptions]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">
          Price <span className="ion-label-secondary">*</span>
        </IonLabel>
        <div className="flex currency-price">
          <SelectField name={currencyFieldName} options={currencyOptions} />
          <NumberField
            disabled={disabled}
            required
            name={priceFieldName}
            min={MIN_ITEM_PRICE}
          />
        </div>
      </ListItem>
      <FormFieldError
        error={errors[priceFieldName] ? 'Price is required' : ''}
      />
    </React.Fragment>
  )
}

export default Price
