import React from 'react'

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

interface IProps {
  selectedItems: Array<string>
}

class SearchPage extends React.Component<IProps> {
  locationState = getLocationState() as ILocationState

  state: IState = {
    selectedCategory: this.locationState.category || itemCategories[0].value,
  }

  userIsAdmin = userIsAdmin()

  componentDidMount() {
    this.fetchItems('*')
  }

  fetchItems = async (search: string) => {
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
        this.setState({ results })
      })
      .catch(err => {
        showToast(err.error || err.toString())
        console.error(err) // eslint-disable-line
      })
    hideLoading()

    return response
  }

  onRefresh = (event?: CustomEvent<RefresherEventDetail>) =>
    this.fetchItems('*').finally(() => event && event.detail.complete())

  onSearch = ({ detail: { value } }: CustomEvent) => {
    this.setState({ search: value.toLowerCase() })
  }

  onSelect = (result: IItemSearchResult) => {
    if (userIsClientUser() || !sessionAvailable()) {
      const { selectedItems } = this.props
      if (selectedItems.indexOf(result._id) < 0) {
        addToCart(result)
      } else {
        removeFromCart(result._id)
      }
    }
  }

  onCategorySelected = (category: string) => {
    this.setState({ selectedCategory: category })
  }

  render() {
    const { selectedCategory } = this.state
    const { selectedItems } = this.props

    const context = { ...this.state, selectedItems }

    return (
      <IonPage className="search">
        <Header
          title={getTitle(this.onSearch)}
          actions={getSearchToolbarActions({
            selectedCategory,
            itemCategories,
            onCategorySelected: this.onCategorySelected,
          })}
        />
        <IonContent class="popover-search-results">
          <IonRefresher slot="fixed" onIonRefresh={this.onRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <Context.Provider value={context}>
            <SearchResults onSelect={this.onSelect} />
            {this.userIsAdmin ? <AddItemButton /> : <SubmitButton />}
          </Context.Provider>
        </IonContent>
      </IonPage>
    )
  }
}

const mapStateToProps = (state: ReducerState) => ({
  selectedItems: state.App.cart.map(result => result._id),
})

export default connect(mapStateToProps)(SearchPage)
