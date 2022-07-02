import React, { useMemo } from 'react'
import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { pencil as editIcon } from 'ionicons/icons'

import { ItemSearchResult as IItemSearchResult } from 'types'

import { Header } from 'components'

import { getItemState } from 'utils'
import { formatMoney } from 'utils/currency'
import { userIsAdmin } from 'utils/role'

import Routes from 'routes'
import { navigateTo } from 'app-history'
import { setSupplierItem } from 'store/utils'

import SearchResultDataWrapper from 'components/DataWrapper/SearchResult'

import Images from './Images'
import ListedDetails from './ListedDetails'
import AddToCartButton from './AddToCartButton'

interface IItem {
  result: IItemSearchResult
  selectedItems: Array<IItemSearchResult>
}

const Item: React.FC<IItem> = ({ result, selectedItems }) => {
  const { item, price, images, available } = result

  const toolbarActions = useMemo(() => {
    if (userIsAdmin()) {
      return [
        {
          icon: editIcon,
          handler: () => {
            if (Routes['supplier-item-update'].getPath) {
              setSupplierItem(result)
              navigateTo(
                Routes['supplier-item-update'].getPath(
                  result.pharmacy._id,
                  result._id
                )
              )
            }
          },
        },
      ]
    }
  }, [result])

  return (
    <IonPage>
      <Header size="small" title={result.item.name} actions={toolbarActions} />
      <IonContent className="ion-padding">
        {/* <ContentHeader message={`Supplied by ${result.pharmacy.name}`} /> */}
        <IonList lines="none">
          <Images urls={images} />
          <IonItem className="ion-no-padding ion-margin-top">
            <IonLabel>
              <h4>
                <b>{formatMoney(price)}</b>
              </h4>
              <h4>{getItemState(available)}</h4>
            </IonLabel>
          </IonItem>
          <ListedDetails details={item.specification} />
        </IonList>
        <AddToCartButton selectedItems={selectedItems} result={result} />
      </IonContent>
    </IonPage>
  )
}

export default SearchResultDataWrapper(Item, 'item')
