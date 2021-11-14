import React from 'react'

import { IonContent, IonPage } from '@ionic/react'
import { Header, Popover } from 'components'

import Requests, { endPoints } from 'requests'
import { getDeliveryLocationForNextOrder } from 'location'

import { ItemSearchResult as IItemSearchResult } from 'types'

import { hideLoading, showLoading, showToast } from 'store/utils'
import { getLocationState } from 'app-history'
import { userIsAdmin, userIsClientUser } from 'utils/role'

import { getSearchToolbarActions, getTitle } from './toolbar-actions'
import { itemCategories } from './utils'

import SearchResults from './SearchResults'
import PopoverItemDetails from './PopoverItemDetails'
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
  selectedItems: Array<IItemSearchResult>
  selectedCategory: string
  search?: string
  popoverResult: IItemSearchResult | null
}

class SearchPage extends React.Component {
  locationState = getLocationState() as ILocationState

  state: IState = {
    selectedItems: this.locationState.items || [],
    selectedCategory: this.locationState.category || itemCategories[0].value,
    popoverResult: null,
  }

  userIsAdmin = userIsAdmin()

  componentDidMount() {
    this.fetchItems('*').then(results => {
      this.setState({ results })
    })
  }

  fetchItems = async (search: string) => {
    if (search === '') return
    if (search === null) return

    const { lat, lon } = getDeliveryLocationForNextOrder()

    showLoading()
    const response = await Requests.get<Array<IItemSearchResult>>(
      endPoints['item-search'],
      {
        params: { search, lat, lon },
      }
    ).catch(err => {
      showToast(err.error || err.toString())
      console.error(err) // eslint-disable-line
    })
    hideLoading()

    return response
  }

  onSearch = ({ detail: { value } }: CustomEvent) => {
    this.setState({ search: value.toLowerCase() })
  }

  onSelect = (result: IItemSearchResult) => {
    if (userIsClientUser() || !sessionAvailable()) {
      const { selectedItems } = this.state
      const index = selectedItems.findIndex(item => item._id === result._id)
      if (index < 0) {
        selectedItems.push(result)
      } else {
        selectedItems.splice(index, 1)
      }
      this.setState({ selectedItems })
    }
  }

  onCategorySelected = (category: string) => {
    this.setState({ selectedCategory: category })
  }

  onImageClick = (result: IItemSearchResult) => {
    this.setState({ popoverResult: result })
  }

  onDismissItemPopover = () => {
    this.setState({ popoverResult: null })
  }

  render() {
    const { selectedCategory, popoverResult } = this.state

    const context = this.state

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
          <Context.Provider value={context}>
            <SearchResults
              onSelect={this.onSelect}
              onImageClick={this.onImageClick}
            />
            {this.userIsAdmin ? <AddItemButton /> : <SubmitButton />}
          </Context.Provider>
        </IonContent>
        <Popover
          open={Boolean(popoverResult)}
          onDismiss={this.onDismissItemPopover}
          cssClass="popover-item-detail"
        >
          <PopoverItemDetails result={popoverResult} />
        </Popover>
      </IonPage>
    )
  }
}

export default SearchPage
