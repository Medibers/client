import React, { useEffect, useMemo, useRef, useState } from 'react'

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
  fetchData: number
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

  const [state, setState] = useState<IState>({
    fetchData: 0,
    selectedCategory: locationState.category || allCategoriesOption.value,
  })

  const updateState = (newState: Partial<IState>) => {
    setState(oldState => ({ ...oldState, ...newState }))
  }

  useEffect(() => {
    fetchItems('*')
  }, [state.fetchData]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItems = function (
    search: string,
    results?: IItemSearchResult[]
  ): Promise<void> {
    if (['', null].includes(search)) return Promise.resolve()

    let previousResults: IItemSearchResult[] = []

    if (results) {
      previousResults = results
    } else {
      previousResults = state.results ? state.results : []
    }

    const skip = Array.from(new Set(previousResults.map(({ _id }) => _id)))

    const { lat, lon } = getDeliveryLocationForNextOrder()

    if (!state.results) showLoading()

    return Requests.post<Array<IItemSearchResult>>(endPoints['item-search'](), {
      search,
      lat,
      lon,
      size: 10,
      skip,
    })
      .then(results => {
        updateState({
          results: previousResults.concat(results),
        })
      })
      .catch(err => {
        showToast(err.error || err.toString())
        console.error(err) // eslint-disable-line
      })
      .finally(hideLoading)
  }

  const onRefresh = (event?: CustomEvent<RefresherEventDetail>) =>
    fetchItems('*', []).finally(() => event && event.detail.complete())

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

  const context = { ...state, updateState, selectedItems }

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
        {/* Scroll Observer */}
        <Observer updateState={updateState} />
      </IonContent>
    </IonPage>
  )
}

interface IObserver {
  updateState: (newState: Partial<IState>) => void
}

const Observer: React.FC<IObserver> = ({ updateState }) => {
  const observerTargetYRef = useRef(0)

  // eslint-disable-next-line no-undef
  const callback: IntersectionObserverCallback = entities => {
    // @ts-ignore
    const { y } = entities[0].boundingClientRect

    if (y === 0) return

    if (y < observerTargetYRef.current || observerTargetYRef.current === 0) {
      updateState({ fetchData: Date.now() })
    }

    observerTargetYRef.current = y
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })

    const element = document.querySelector('#observer-target') as Element

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id="observer-target"
      style={{
        background: 'transparent',
        height: 4,
      }}
    />
  )
}

const CategoriesWrapper = CategoriesDataWrapper(() => <React.Fragment />)

const mapStateToProps = (state: ReducerState) => ({
  selectedItems: state.App.cart.map(result => result._id),
  categories: state.App.categories || [],
})

export default connect(mapStateToProps)(SearchPage)
