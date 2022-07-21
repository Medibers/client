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
      <IonContent>
        <div className="position-relative" style={{ minHeight: '55vh' }}>
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
                <h4>
                  <i className="ion-label-secondary">
                    {getItemState(available)}
                  </i>
                </h4>
              </IonLabel>
            </IonItem>
            <IonItem
              className="ion-no-padding"
              style={{ '--min-height': 'unset' }}
            >
              <IonLabel className="no-wrap">
                <h2 style={{ fontWeight: 500 }}>{formatMoney(price)}</h2>
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
