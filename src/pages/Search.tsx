import React from 'react'
import Routes from 'routes'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { State as ReducerState } from 'reducers'

import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'
import { closeOutline as close, send } from 'ionicons/icons'

import {
  Header,
  Item as ItemDetail,
  ItemSearchResult,
  Popover,
} from 'components'

import Requests, { endPoints } from 'requests'
import { getDeliveryLocationForNextOrder } from 'location'

import { ItemSearchResult as IItemSearchResult, ToolbarAction } from 'types'

import { platformIsWebBrowser } from 'utils'
import { getLocationState, navigateTo, redirectTo } from 'app-history'
import { userIsClientUser } from 'utils/role'

import ItemCategoryMap from 'utils/item-category-map'

interface ISearchPageProps {
  items: Array<IItemSearchResult> | undefined
  setItems: (e: Array<IItemSearchResult> | null) => {}
  showLoading: () => void
  hideLoading: () => void
  showToast: (e: string) => {}
}

const searchPlaceholder = 'Search'
const noItemsPlaceholder = 'No items found, please try a different search'

const itemCategories = Object.keys(ItemCategoryMap).map((key: string) => ({
  label: ItemCategoryMap[key].label,
  value: key,
}))

interface ILocationState {
  items?: Array<IItemSearchResult>
  category?: string
}

class SearchPage extends React.Component<ISearchPageProps> {
  locationState = getLocationState() as ILocationState

  state = {
    selectedItems: this.locationState.items || [],
    selectedCategory: this.locationState.category || itemCategories[0].value,
    search: undefined,
    popoverResult: null,
  }

  componentDidMount() {
    const { items: itemsReturned } = this.props
    if (itemsReturned) return
    this.fetchItems('*')
  }

  fetchItems = (search: string) => {
    if (search === '') return
    if (search === null) return

    const { lat, lon } = getDeliveryLocationForNextOrder()
    const { setItems, showLoading, hideLoading, showToast } = this.props

    showLoading()
    Requests.get<Array<IItemSearchResult>>(endPoints['item-search'], {
      params: { search, lat, lon },
    })
      .then(response => {
        setItems(response)
      })
      .catch(err => {
        showToast(err.error || err.toString())
        throw err
      })
      .finally(hideLoading)
  }

  onSearch = ({ detail: { value } }: CustomEvent) => {
    this.setState({ search: value.toLowerCase() })
  }

  onSelect = (result: IItemSearchResult) => {
    const { selectedItems } = this.state
    const index = selectedItems.findIndex(item => item._id === result._id)
    if (index < 0) {
      selectedItems.push(result)
    } else {
      selectedItems.splice(index, 1)
    }
    this.setState({ selectedItems })
  }

  onMore = (result: IItemSearchResult) => {
    navigateTo(Routes.item.path, result)
  }

  isSelected = (result: IItemSearchResult) =>
    this.state.selectedItems.findIndex(item => item._id === result._id) > -1

  onSubmit = () => {
    const { selectedItems } = this.state
    redirectTo(Routes.order.path, { selectedItems })
  }

  onCategorySelected = (category: string) => {
    this.setState({ selectedCategory: category })
  }

  toolbarActions = () => {
    const { selectedCategory } = this.state
    const toolbarActions: Array<ToolbarAction> = [
      {
        component: () => (
          <IonButton style={{ textTransform: 'unset' }}>
            <IonSelect
              interfaceOptions={{
                showBackdrop: false,
                cssClass: 'search-category-select-popover',
              }}
              interface="popover"
              onIonChange={({ detail: { value } }: CustomEvent) =>
                this.onCategorySelected(value)
              }
              value={selectedCategory}
            >
              {itemCategories.map(({ label, value }, i, a) => (
                <IonSelectOption
                  key={i}
                  className={i < a.length - 1 ? '' : 'last'}
                  value={value}
                >
                  {label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonButton>
        ),
        handler: () => {},
      },
    ]
    return toolbarActions
  }

  // eslint-disable-next-line no-undef
  searchbar: HTMLIonSearchbarElement | null = null

  title = () => (
    <IonSearchbar
      ref={e => (this.searchbar = e)}
      style={{
        paddingInlineStart: platformIsWebBrowser ? 'var(--ion-padding)' : 0,
        '--icon-color': 'var(--ion-color-primary)',
        '--color': 'var(--ion-color-primary)',
      }}
      placeholder={searchPlaceholder}
      className="searchbar ion-no-padding"
      clearIcon={close}
      onIonChange={this.onSearch}
    />
  )

  computeItemsShown = () => {
    const { items = [] } = this.props
    const { selectedCategory, search = '' } = this.state
    return selectedCategory !== itemCategories[0].value
      ? items.filter(
          ({ item: { name, category } }) =>
            category === selectedCategory && name.toLowerCase().includes(search)
        )
      : items.filter(({ item: { name } }) =>
          name.toLowerCase().includes(search)
        )
  }

  onImageClick = (result: IItemSearchResult) => {
    this.setState({ popoverResult: result })
  }

  onDismissItemPopover = () => {
    this.setState({ popoverResult: null })
  }

  render() {
    const { popoverResult } = this.state
    const items = this.computeItemsShown()
    const itemsReturned = Boolean(items)

    const onSelect = userIsClientUser() ? this.onSelect : undefined

    return (
      <IonPage className="search">
        <Header title={this.title()} actions={this.toolbarActions()} />
        <IonContent class="popover-search-results">
          <IonList className="ion-no-margin ion-no-padding">
            {items.length ? (
              items.map((result, i, a) => (
                <ItemSearchResult
                  key={i}
                  result={result}
                  lines={i !== a.length - 1}
                  selected={this.isSelected(result)}
                  onSelect={onSelect}
                  onImageClick={() => this.onImageClick(result)}
                  onMore={this.onMore}
                />
              ))
            ) : itemsReturned && items.length === 0 ? (
              <IonItem lines="none">
                <IonLabel>
                  <p>{noItemsPlaceholder}</p>
                </IonLabel>
              </IonItem>
            ) : null}
          </IonList>
          {this.state.selectedItems.length ? (
            <IonFab
              className="ion-margin"
              vertical="bottom"
              horizontal="end"
              slot="fixed"
            >
              <IonFabButton
                className="ion-action-primary"
                onClick={this.onSubmit}
              >
                <IonIcon icon={send} />
              </IonFabButton>
            </IonFab>
          ) : null}
        </IonContent>
        <Popover
          open={Boolean(popoverResult)}
          onDismiss={this.onDismissItemPopover}
          cssClass="popover-item-detail"
        >
          <ItemDetail result={popoverResult}></ItemDetail>
        </Popover>
      </IonPage>
    )
  }
}

const mapStateToProps = (state: ReducerState) => ({
  items: state.App.items || undefined,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setItems: payload => ({
        type: constants.SET_ITEMS,
        payload,
      }),
      showLoading: () => ({
        type: constants.SHOW_LOADING,
      }),
      hideLoading: () => ({
        type: constants.HIDE_LOADING,
      }),
      showToast: (payload: string) => ({
        type: constants.SHOW_TOAST,
        payload,
      }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
