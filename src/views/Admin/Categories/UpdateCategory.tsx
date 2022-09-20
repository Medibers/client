import React, { useState } from 'react'
import { useParams } from 'react-router'

import { ICategory, ToolbarAction } from 'types'
import { ICategoryFormFields } from './types'

import { IonContent, IonPage } from '@ionic/react'
import { close } from 'ionicons/icons'
import { Alert, Header } from 'components'

import Requests, { endPoints, useCategory } from 'requests'
import { CATEGORIES_URL } from 'routes'
import { redirectTo } from 'app-history'
import {
  hideLoading,
  setCategories,
  setCategory,
  showLoading,
  showToast,
} from 'store/utils'

import CategoryForm from './CategoryForm'

interface IParams {
  id: string
}

const UpdateCategory: React.FC = () => {
  const [state, setState] = useState({ submitting: false, alertOpen: false })

  const updateState = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { submitting, alertOpen } = state

  const { id } = useParams<IParams>()

  const [, , category] = useCategory(id)

  const onSubmit = (values: ICategoryFormFields) => {
    updateState({ submitting: true })
    showLoading()
    Requests.put<ICategory>(endPoints.categories + '/' + id, values)
      .then(result => {
        showToast('Category updated')
        setCategory(result)
        redirectTo(CATEGORIES_URL)
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        updateState({ submitting: false })
      })
      .finally(hideLoading)
  }

  const onDelete = () => {
    showLoading()
    Requests.delete(endPoints.categories + '/' + id)
      .then(() => {
        showToast('Category deleted')
        setCategories() // To trigger a /categories refetch
        redirectTo(CATEGORIES_URL)
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        showToast(error.error)
      })
      .finally(hideLoading)
  }

  const toolbarActions: ToolbarAction[] = [
    { icon: close, handler: () => updateState({ alertOpen: true }) },
  ]

  return (
    <IonPage>
      <Header title="Update Category" size="small" actions={toolbarActions} />
      <IonContent className="ion-padding">
        {category && (
          <CategoryForm
            disabled={submitting}
            onSubmit={onSubmit}
            category={category}
          />
        )}
        <Alert
          open={alertOpen}
          header="Confirm delete"
          message="Please ensure no items are registered under this category"
          buttonText="Delete"
          onDismiss={() => updateState({ alertOpen: false })}
          onConfirm={onDelete}
        />
      </IonContent>
    </IonPage>
  )
}

export default UpdateCategory
