import React, { useContext } from 'react'
import { IonItem, IonLabel, IonList } from '@ionic/react'

import SearchResult from './SearchResult'

import { ItemSearchResult as IItemSearchResult } from 'types'

import Routes from 'routes'
import { navigateTo } from 'app-history'
import { setSearchResult } from 'store/utils'

import { itemCategories } from './utils'

import Context from './context'

const noItemsPlaceholder = 'No items found, please try a different search'

interface ISearchResults {
  onSelect: (result: IItemSearchResult) => void
}

const SearchResults: React.FC<ISearchResults> = ({ onSelect }) => {
  const {
    results,
    search = '',
    selectedCategory,
    selectedItems,
  } = useContext(Context)

  const computeResultsShown = (allResults: Array<IItemSearchResult>) => {
    return selectedCategory !== itemCategories[0].value
      ? allResults.filter(
          ({ item: { name, category } }) =>
            category === selectedCategory && name.toLowerCase().includes(search)
        )
      : allResults.filter(({ item: { name } }) =>
          name.toLowerCase().includes(search)
        )
  }

  const isSelected = (result: IItemSearchResult) =>
    selectedItems.indexOf(result._id) > -1

  const onMore = (result: IItemSearchResult) => {
    setSearchResult(result)
    if (Routes.item.getPath) {
      navigateTo(Routes.item.getPath(result._id))
    }
  }

  const resultsShown = computeResultsShown(results || [])

  return (
    <IonList className="ion-no-margin ion-no-padding">
      {resultsShown.length ? (
        resultsShown.map((result, i, a) => (
          <SearchResult
            key={i}
            result={result}
            lines={i !== a.length - 1}
            selected={isSelected(result)}
            onSelect={onSelect}
            onMore={onMore}
          />
        ))
      ) : Boolean(results) && resultsShown.length === 0 ? (
        <IonItem lines="none">
          <IonLabel>
            <p>{noItemsPlaceholder}</p>
          </IonLabel>
        </IonItem>
      ) : null}
    </IonList>
  )
}

export default SearchResults
