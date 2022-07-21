import React, { useEffect, useRef, useState } from 'react'
import { IonInput, IonLabel } from '@ionic/react'
import { useFormContext } from 'react-hook-form'
import { queryPlace } from 'location'

import { FormFieldError, ListItem } from 'components'

import SupplierAddressResults from './SupplierAddressResults'

const wrapperStyle: React.CSSProperties = { position: 'relative' }

const addressFormField = 'address'
const latFormField = 'lat'
const lonFormField = 'lon'

const SupplierAddress: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([])
  const { register, getValues, setValue, errors, clearErrors, setError } =
    useFormContext()

  const mapRef: React.MutableRefObject<google.maps.Map | null> = useRef(null)
  // eslint-disable-next-line no-undef
  const inputRef = useRef<HTMLIonInputElement>(null)

  useEffect(() => {
    mapRef.current = new google.maps.Map(
      document.querySelector('.address-search-map') as HTMLElement
    )

    register(latFormField, { required: true })
    register(lonFormField, { required: true })
    register(addressFormField, {
      validate: value => Boolean(value),
    })

    setInputNodeValue(getValues(addressFormField))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSearch = async (value: string | null) => {
    if (mapRef.current == null) return

    if (value !== null) {
      setResults(await queryPlace(mapRef.current, value))
    } else {
      setError(addressFormField, {})
    }
  }

  const onPlacesResultClick = ({
    name,
    geometry,
  }: google.maps.places.PlaceResult) => {
    if (geometry) {
      setValue(latFormField, geometry.location.lat())
      setValue(lonFormField, geometry.location.lng())
      setValue(addressFormField, name)

      clearErrors([addressFormField, latFormField, lonFormField])
    }

    setResults([])
    setInputNodeValue(name)
  }

  const setInputNodeValue = async (value: string) => {
    if (inputRef.current) {
      const node = await inputRef.current.getInputElement()
      node.value = value || ''
    }
  }

  return (
    <div style={wrapperStyle}>
      <ListItem>
        <IonLabel position="stacked">
          Address <span className="ion-label-secondary">*</span>
        </IonLabel>
        <IonInput
          ref={inputRef}
          disabled={disabled}
          onIonChange={event => onSearch(event.detail.value || null)}
        />
        <div className="address-search-map ion-hide" />
      </ListItem>
      <FormFieldError
        error={
          errors[latFormField] ||
          errors[lonFormField] ||
          errors[addressFormField]
            ? 'Address is required'
            : ''
        }
      />
      <SupplierAddressResults
        results={results}
        onPlacesResultClick={onPlacesResultClick}
      />
    </div>
  )
}

export default SupplierAddress
