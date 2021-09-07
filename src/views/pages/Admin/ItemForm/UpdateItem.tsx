import React, { useState } from 'react'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import ItemForm from './ItemForm'

import { IItem } from 'types'
import { IItemFormFields } from './types'

import Requests, { endPoints } from 'requests'
import { showToast } from 'store/utils'

import { getLocationState, goBack } from 'app-history'

const UpdateItem: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)

  const item = getLocationState<IItem>()

  const onSubmit = (values: IItemFormFields) => {
    setSubmitting(true)
    Requests.put(endPoints.items + `/${item._id}`, values)
      .then(() => {
        showToast('Item updated')
        goBack()
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        showToast(error.error)
        setSubmitting(false)
      })
  }

  return (
    <IonPage>
      <Header title="Update Item" size="small" />
      <IonContent className="ion-padding-horizontal">
        <ItemForm disabled={submitting} item={item} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default UpdateItem
