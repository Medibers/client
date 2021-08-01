import React from 'react'
import Routes from 'routes'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { IonButton, IonContent, IonItem, IonList, IonPage } from '@ionic/react'

import { Header, Alert as OrderConfirmationAlert } from 'components'
import { getSessionPhone, setActiveRequestsPresence } from 'session'
import { getDeliveryLocationForNextOrder } from 'location'

import { State as ReducerState } from 'reducers'
import {
  ItemRequest as IItemRequest,
  ItemSearchResult as IItemSearchResult,
} from 'types'
import { computeOrderCostAndDistance } from 'utils/charges'

import Requests, { endPoints } from 'requests'

import history, {
  getLocationState,
  goBack,
  navigateTo,
  redirectTo,
} from 'app-history'

import SelectedItems from './SelectedItems'

import Context from './context'

import { AlertText } from './utils'

import DeliveryLocation from './DeliveryLocation'
import DeliveryContact from './DeliveryContact'

import { formatUGMSISDN } from 'utils/msisdn'
import { IOrderDeliveryContact } from './types'

interface IOrderProps {
  requests?: Array<IItemRequest>
  setItemRequests: (e: Array<IItemRequest> | null) => {}
  showLoading: () => void
  hideLoading: () => void
  showToast: (e: string) => void
  hideToast: () => void
}

interface ILocationState {
  selectedItems: Array<IItemSearchResult>
}

const title = 'Your order'
const primaryAction = 'Order now'

const alertText = AlertText.confirmation()

class Component extends React.Component<IOrderProps> {
  getInitialSelectedItems = () => {
    const { selectedItems = [] } = getLocationState<ILocationState>()
    return selectedItems.map(e => {
      if (e.quantity) return e
      return { ...e, quantity: 1 }
    })
  }

  selectedItems = this.getInitialSelectedItems()

  state = {
    orderConfirmationShown: false,
    selectedItems: this.selectedItems,
    ...computeOrderCostAndDistance(this.selectedItems),
    contacts: [
      {
        phone: formatUGMSISDN(getSessionPhone() as string),
      },
    ] as Array<IOrderDeliveryContact>,
  }

  onModifyCart = () => {
    const { selectedItems } = this.state
    redirectTo(Routes.search.path, {
      items: selectedItems,
    })
  }

  locationNotAvailable = () => {
    let { lat, lon } = getDeliveryLocationForNextOrder()
    return lat === undefined || lon === undefined
  }

  onSelectDestination = async () => {
    let { lat, lon } = getDeliveryLocationForNextOrder()
    navigateTo(Routes.location.path, lat && lon ? { lat, lon } : undefined)
  }

  onSetContacts = (contacts: IOrderDeliveryContact[]) => {
    this.setState({ contacts })
  }

  onConfirmOrder = () => {
    const { contacts } = this.state
    const {
      requests = [],
      setItemRequests,
      showLoading,
      hideLoading,
      showToast,
    } = this.props
    const { lat, lon, address } = getDeliveryLocationForNextOrder()

    const locationState = getLocationState<ILocationState>()

    const payload = {
      'pharmacy-items': locationState.selectedItems.map(o => ({
        item: o._id,
        quantity: o.quantity,
      })),
      contacts,
      lat,
      lon,
      address,
    }
    showLoading()
    Requests.post<Array<IItemRequest> | { error?: string }>(
      endPoints['item-requests'],
      payload
    )
      .then(response => {
        const { error } = response as { error?: string }
        if (error) {
          showToast(error)
          // eslint-disable-next-line no-console
          console.error(error)
        } else {
          setActiveRequestsPresence(true)
          const { requestInitiatedFromRequestsPage } =
            getLocationState<Record<string, unknown>>()
          setItemRequests((response as Array<IItemRequest>).concat(requests))
          if (requestInitiatedFromRequestsPage) {
            goBack()
          } else {
            redirectTo(Routes.requests.path)
          }
        }
      })
      .catch(error => {
        const err = error.error || error.toString()
        showToast(err)
        throw err
      })
      .finally(hideLoading)
  }

  setOrderConfirmationVisibility = (orderConfirmationShown: boolean) =>
    this.setState({ orderConfirmationShown })

  onModifyItemQuantity = (searchResultId: string, quantity: number) => {
    const { selectedItems } = this.state
    const newSelectedItems = selectedItems.map(e => {
      if (e._id === searchResultId && quantity > 0) {
        e.quantity = quantity
      }
      return e
    })
    this.setState(
      {
        selectedItems: newSelectedItems,
        ...computeOrderCostAndDistance(newSelectedItems),
      },
      () => {
        history.location.state = { selectedItems: newSelectedItems }
      }
    )
  }

  onPrimaryAction = () => {
    this.setOrderConfirmationVisibility(true)
  }

  render() {
    const { cost, orderConfirmationShown, selectedItems, contacts } = this.state

    const locationNotAvailable = this.locationNotAvailable()

    const context = {
      cost,
      selectedItems,
      locationNotAvailable,
      contacts,
      onModifyItemQuantity: this.onModifyItemQuantity,
      onModifyCart: this.onModifyCart,
      onSelectDestination: this.onSelectDestination,
      onSetContacts: this.onSetContacts,
    }

    return (
      <IonPage className="order">
        <Header title={title} />
        <Context.Provider value={context}>
          <IonContent>
            <IonList lines="full">
              <SelectedItems />
              <DeliveryLocation />
              <DeliveryContact />
              <IonItem lines="none">
                <IonButton
                  onClick={this.onPrimaryAction}
                  disabled={locationNotAvailable}
                  className="ion-margin-top ion-action-primary"
                  size="default"
                >
                  {primaryAction}
                </IonButton>
              </IonItem>
            </IonList>
          </IonContent>
        </Context.Provider>
        <OrderConfirmationAlert
          open={orderConfirmationShown}
          header={alertText.header}
          message={alertText.message}
          buttonText={alertText.buttonText}
          onConfirm={this.onConfirmOrder}
          onDismiss={() => this.setOrderConfirmationVisibility(false)}
        />
      </IonPage>
    )
  }
}

const mapStateToProps = (state: ReducerState) => ({
  requests: state.App.requests || undefined,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setItemRequests: payload => ({
        type: constants.SET_ITEM_REQUESTS,
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
      hideToast: () => ({
        type: constants.HIDE_TOAST,
      }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Component)
