import React, { useState } from 'react'

import { IonContent, IonPage } from '@ionic/react'
import { ContentHeader, Header } from 'components'

import ItemForm from './ItemForm'

import { IItemFormFields } from './types'

import Requests, { endPoints } from 'requests'
import { showToast } from 'store/utils'

import { goBack } from 'app-history'

const AddItem: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values: IItemFormFields) => {
    console.info(values) // eslint-disable-line
    setSubmitting(true)
    Requests.post(endPoints.items, values)
      .then(() => {
        showToast('Item registered')
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
      <Header title="New Item" size="small" />
      <IonContent className="ion-padding">
        <ContentHeader
          message="Please provide item details. After submit, you should register the item under a supplier to add it to
            market"
        />
        <ItemForm disabled={submitting} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default AddItem
