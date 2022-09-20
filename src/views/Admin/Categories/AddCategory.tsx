import React, { useState } from 'react'

import { ICategoryFormFields } from './types'

import { IonContent, IonPage } from '@ionic/react'
import { ContentHeader, Header } from 'components'

import Requests, { endPoints } from 'requests'
import { CATEGORIES_URL } from 'routes'
import { redirectTo } from 'app-history'
import { hideLoading, setCategories, showLoading, showToast } from 'store/utils'

import CategoryForm from './CategoryForm'

const AddCategory: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values: ICategoryFormFields) => {
    setSubmitting(true)
    showLoading()
    Requests.post(endPoints.categories, values)
      .then(() => {
        showToast('Category registered')
        setCategories() // To trigger a /categories refetch
        redirectTo(CATEGORIES_URL)
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        setSubmitting(false)
      })
      .finally(hideLoading)
  }

  return (
    <IonPage>
      <Header title="New Category" size="small" />
      <IonContent className="ion-padding ion-margin-top">
        <ContentHeader message="Please provide the category name" />
        <CategoryForm disabled={submitting} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default AddCategory
