/* eslint-disable no-unused-vars */

import React from 'react'
import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'

import { ItemSearchResult as IItemSearchResult } from 'types'

import { Header, ImageSlider } from 'components'

import { getItemState } from 'utils'
import { formatMoney } from 'utils/currency'

import SearchResultDataWrapper from 'components/DataWrapper/SearchResult'

import ListedDetails from './ListedDetails'
import AddToCartButton from './AddToCartButton'
import EditButton from './EditButton'

import './Item.scss'

interface IItem {
  result: IItemSearchResult
  selectedItems: Array<IItemSearchResult>
}

const Item: React.FC<IItem> = ({ result, selectedItems }) => {
  const { item, currency, price, images, available, unit } = result

  const showSupplier = item.categoryObject.service
  const showUnit = !item.categoryObject.service

  return (
    <IonPage>
      <IonContent className="item-details">
        <div className="position-relative">
          {/* Support the back button */}
          <Header title="" backgroundTransparent />
          <ImageSlider urls={images} />
        </div>
        <div className="ion-padding">
          <EditButton result={result} />
          {/* <ContentHeader message={`Supplied by ${result.pharmacy.name}`} /> */}
          <IonList lines="none">
            <IonItem
              className="ion-no-padding"
              style={{ '--min-height': 'unset' }}
            >
              <IonLabel className="ion-no-margin wrap">
                <h1>{result.item.name}</h1>
                {showSupplier && (
                  <h4>
                    <i>Provided by {result.pharmacy.name}</i>
                  </h4>
                )}
              </IonLabel>
            </IonItem>
            <IonItem
              className="ion-no-padding"
              style={{ '--min-height': 'unset' }}
            >
              <IonLabel className="wrap">
                <h4>
                  <i className="ion-label-secondary">
                    {getItemState(available)}
                  </i>
                </h4>
                <h2>
                  {formatMoney(price, currency.name)}&nbsp;
                  {showUnit && (
                    <React.Fragment>
                      per {unit.singular || 'unit'}
                    </React.Fragment>
                  )}
                </h2>
              </IonLabel>
            </IonItem>
            {available && (
              <AddToCartButton selectedItems={selectedItems} result={result} />
            )}
            <ListedDetails details={item.specification} />
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SearchResultDataWrapper(Item, 'item')
