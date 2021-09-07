import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IonInput, IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError } from 'components/FormFields'

// import { useGetItems } from '../../hooks'
import ItemResults from './ItemResults'

import { IItem } from 'views/pages/Admin/types'
import { useDebounce } from 'views/pages/Admin/utils'

import Requests, { endPoints } from 'requests'

const fieldName = 'item'

const wrapperStyle: React.CSSProperties = { position: 'relative' }

const Item: React.FC = () => {
  const { errors, clearErrors, register, setValue } = useFormContext()

  const [searchStr, setSearchStr] = useState<string | null>(null)
  const [results, setResults] = useState<IItem[]>([])

  const debouncedSearchStr = useDebounce(searchStr || '') // Debounce this

  useEffect(() => {
    register(fieldName, { required: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    searchStr &&
      Requests.get<IItem[]>(
        endPoints.items + '/?search=' + debouncedSearchStr
      ).then(setResults)
  }, [debouncedSearchStr]) // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line no-undef
  const inputRef = useRef<HTMLIonInputElement>(null)

  // const [, results] = useGetItems(searchStr)

  const setInputNodeValue = async (value: string) => {
    if (inputRef.current) {
      const node = await inputRef.current.getInputElement()
      node.value = value || ''
    }
  }

  const handleChange = (event: CustomEvent) => {
    setSearchStr(event.detail.value || null)
    setValue(fieldName, null)
  }

  const handleItemResultClick = ({ _id, name }: IItem) => {
    setValue(fieldName, _id)
    clearErrors(fieldName)
    setResults([])
    setInputNodeValue(name)
  }

  return (
    <div style={wrapperStyle}>
      <ListItem>
        <IonLabel position="stacked">
          Item <span className="ion-label-secondary">*</span>
        </IonLabel>
        <IonInput
          ref={inputRef}
          placeholder="Type to search for an item"
          onIonChange={handleChange}
        />
      </ListItem>
      <FormFieldError
        error={errors[fieldName] ? 'Please select an item' : ''}
      />
      <ItemResults
        results={results}
        onItemResultClick={handleItemResultClick}
      />
    </div>
  )
}

export default Item
