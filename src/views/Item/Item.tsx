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

interface IItem {
  result: IItemSearchResult
  selectedItems: Array<IItemSearchResult>
}

const Item: React.FC<IItem> = ({ result, selectedItems }) => {
  const { item, price, images, available } = result

  return (
    <IonPage>
      <div className="position-relative" style={{ minHeight: '55vh' }}>
        {/* Support the back button */}
        <Header title="" backgroundTransparent />
        <ImageSlider urls={images} />
      </div>
      <IonContent className="ion-padding">
        {/* <ContentHeader message={`Supplied by ${result.pharmacy.name}`} /> */}
        <IonList lines="none">
          <IonItem className="ion-no-padding">
            <IonLabel>
              <h1>{result.item.name}</h1>
            </IonLabel>
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonLabel>
              <h2>
                <b>{formatMoney(price)}</b>
              </h2>
              <h4>{getItemState(available)}</h4>
            </IonLabel>
          </IonItem>
          <ListedDetails details={item.specification} />
        </IonList>
        <AddToCartButton selectedItems={selectedItems} result={result} />
        <EditButton result={result} />
      </IonContent>
    </IonPage>
  )
}

export default SearchResultDataWrapper(Item, 'item')
