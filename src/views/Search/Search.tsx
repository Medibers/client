import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import { IonRefresher, IonRefresherContent } from '@ionic/react'
import { RefresherEventDetail } from '@ionic/core'

import Requests, { endPoints } from 'requests'
import { getDeliveryLocationForNextOrder } from 'location'

import { ItemSearchResult as IItemSearchResult } from 'types'

import {
  addToCart,
  hideLoading,
  removeFromCart,
  showLoading,
  showToast,
} from 'store/utils'
import { getLocationState } from 'app-history'
import { userIsAdmin, userIsClientUser } from 'utils/role'

import { getSearchToolbarActions, getTitle } from './toolbar-actions'
import { itemCategories } from './utils'

import SearchResults from './SearchResults'
import AddItemButton from './AddItemButton'
import SubmitButton from './SubmitButton'

import Context from './context'
import { sessionAvailable } from 'session'

interface ILocationState {
  items?: Array<IItemSearchResult>
  category?: string
}

interface IState {
  results?: Array<IItemSearchResult>
  selectedCategory: string
  search?: string
}

interface ISearchPage {
  selectedItems: Array<string>
}

const SearchPage: React.FC<ISearchPage> = ({ selectedItems }) => {
  const locationState = getLocationState() as ILocationState

  const [state, setState] = useState<IState>(() => ({
    selectedCategory: locationState.category || itemCategories[0].value,
  }))

  const updateState = (newState: Partial<IState>) => {
    setState(oldState => ({ ...oldState, ...newState }))
  }

  useEffect(() => {
    fetchItems('*')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItems = async (search: string) => {
    if (search === '') return
    if (search === null) return

    const { lat, lon } = getDeliveryLocationForNextOrder()

    showLoading()
    const response = await Requests.get<Array<IItemSearchResult>>(
      endPoints['item-search'](),
      {
        params: { search, lat, lon },
      }
    )
      .then(results => {
        updateState({ results })
      })
      .catch(err => {
        showToast(err.error || err.toString())
        console.error(err) // eslint-disable-line
      })
    hideLoading()

    return response
  }

  const onRefresh = (event?: CustomEvent<RefresherEventDetail>) =>
    fetchItems('*').finally(() => event && event.detail.complete())

  const onSearch = ({ detail: { value } }: CustomEvent) => {
    updateState({ search: value.toLowerCase() })
  }

  const onSelect = (result: IItemSearchResult) => {
    if (userIsClientUser() || !sessionAvailable()) {
      if (selectedItems.indexOf(result._id) < 0) {
        addToCart(result)
      } else {
        removeFromCart(result._id)
      }
    }
  }

  const onCategorySelected = (category: string) => {
    updateState({ selectedCategory: category })
  }

  const context = { ...state, selectedItems }

  return (
    <IonPage className="search">
      <Header
        title={getTitle(onSearch)}
        actions={getSearchToolbarActions({
          selectedCategory: state.selectedCategory,
          itemCategories,
          onCategorySelected: onCategorySelected,
        })}
      />
      <IonContent class="popover-search-results">
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Context.Provider value={context}>
          <SearchResults onSelect={onSelect} />
          {userIsAdmin() ? <AddItemButton /> : <SubmitButton />}
        </Context.Provider>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state: ReducerState) => ({
  selectedItems: state.App.cart.map(result => result._id),
})

export default connect(mapStateToProps)(SearchPage)
