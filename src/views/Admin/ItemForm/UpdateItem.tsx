import React, { useState } from 'react'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import ItemForm from './ItemForm'

import { IItem, ItemSearchResult as IItemSearchResult } from 'types'
import { IItemFormFields } from './types'

import Requests, { endPoints } from 'requests'
import { setSearchResult, setSupplierItem, showToast } from 'store/utils'

import { goBack } from 'app-history'

import SearchResultDataWrapper from 'components/DataWrapper/SearchResult'

interface IUpdateItem {
  result: IItemSearchResult
}

const UpdateItem: React.FC<IUpdateItem> = ({ result }) => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values: IItemFormFields) => {
    setSubmitting(true)
    Requests.put<IItem[]>(endPoints.items + `/${result.item._id}`, values)
      .then(([updatedItem]) => {
        showToast('Item updated')
        const o = { ...result, item: updatedItem }
        setSupplierItem(o)
        setSearchResult(o)
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
        <ItemForm disabled={submitting} result={result} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

export default SearchResultDataWrapper(UpdateItem, 'item-update')
