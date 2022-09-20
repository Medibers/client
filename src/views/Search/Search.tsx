import React, { useEffect, useMemo, useState } from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { IonContent, IonPage } from '@ionic/react'
import { Header } from 'components'

import { IonRefresher, IonRefresherContent } from '@ionic/react'
import { RefresherEventDetail } from '@ionic/core'

import Requests, { endPoints } from 'requests'
import { getDeliveryLocationForNextOrder } from 'location'

import { ICategory, ItemSearchResult as IItemSearchResult } from 'types'

import {
  addToCart,
  hideLoading,
  removeFromCart,
  showLoading,
  showToast,
} from 'store/utils'
import { getLocationState } from 'app-history'
import { userIsAdmin, userIsClientUser } from 'utils/role'
import { sessionAvailable } from 'session'

import { getSearchToolbarActions, getTitle } from './toolbar-actions'

import CategoriesDataWrapper from 'components/DataWrapper/Categories'

import SearchResults from './SearchResults'
import AddItemButton from './AddItemButton'
import SubmitButton from './SubmitButton'

import Context from './context'
import { allCategoriesOption } from './utils'

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
  categories: Array<ICategory>
}

const SearchPage: React.FC<ISearchPage> = ({ categories, selectedItems }) => {
  const locationState = getLocationState() as ILocationState

  const [state, setState] = useState<IState>(() => ({
    selectedCategory: locationState.category || allCategoriesOption.value,
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

  const itemCategories = useMemo(
    () => [
      allCategoriesOption,
      ...categories.map(({ _id, name }) => ({
        label: name,
        value: _id,
      })),
    ],
    [categories] // eslint-disable-line
  )

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
      <CategoriesWrapper />
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

const CategoriesWrapper = CategoriesDataWrapper(() => <React.Fragment />)

const mapStateToProps = (state: ReducerState) => ({
  selectedItems: state.App.cart.map(result => result._id),
  categories: state.App.categories || [],
})

export default connect(mapStateToProps)(SearchPage)
