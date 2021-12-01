import React, { useEffect, useRef, useState } from 'react'
import Routes from 'routes'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { IonButton, IonContent, IonItem, IonList, IonPage } from '@ionic/react'

import {
  Header,
  MapContainer,
  Alert as OrderConfirmationAlert,
} from 'components'
import { getSessionPhone, setActiveRequestsPresence } from 'session'
import {
  computeDeliveryDistance,
  getDeliveryLocationForNextOrder,
} from 'location'

import { State as ReducerState } from 'reducers'
import {
  ItemRequest as IItemRequest,
  ItemSearchResult as IItemSearchResult,
} from 'types'
import { computeOrderCost } from 'utils/charges'

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

import { hideLoading, showLoading, showToast } from 'store/utils'

interface IOrderProps {
  requests?: Array<IItemRequest>
  setItemRequests: (e: Array<IItemRequest> | null) => {}
}

interface ILocationState {
  selectedItems: Array<IItemSearchResult>
}
interface IItemRequestDetailsRequest {
  fee: number
  distance: number
}

const title = 'Your order'
const primaryAction = 'Order now'

const alertText = AlertText.confirmation()

const getInitialSelectedItems = () => {
  const { selectedItems = [] } = getLocationState<ILocationState>()
  return selectedItems.map(e => {
    if (e.quantity) return e
    return { ...e, quantity: 1 }
  })
}

const onSelectDestination = () => {
  let { lat, lon } = getDeliveryLocationForNextOrder()
  // .push(Routes.location.path, lat && lon ? { lat, lon } : undefined)
  navigateTo(Routes.location.path, lat && lon ? { lat, lon } : undefined)
}

const Component: React.FC<IOrderProps> = props => {
  const [orderConfirmationShown, setOrderConfirmationShown] = useState(false)
  const [selectedItems, setSelectedItems] = useState(getInitialSelectedItems())
  const [cost, setCost] = useState(computeOrderCost(selectedItems))
  const [distance, setDistance] = useState<number | null>(null)
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null)
  const [contacts, setContacts] = useState<Array<IOrderDeliveryContact>>([
    {
      phone: formatUGMSISDN(getSessionPhone() as string),
    },
  ])

  const { lat, lon } = getDeliveryLocationForNextOrder()

  const locationNotAvailableRef = useRef(lat === undefined || lon === undefined)
  const locationNotAvailable = locationNotAvailableRef.current

  const mapRef = useRef<google.maps.Map | null>(null)

  const onGoToCart = () => {
    redirectTo(Routes.search.path, {
      items: selectedItems,
    })
  }

  const onConfirmOrder = () => {
    const { requests = [], setItemRequests } = props
    const { lat, lon, address } = getDeliveryLocationForNextOrder()

    const locationState = getLocationState<ILocationState>()

    const payload = {
      'pharmacy-items': locationState.selectedItems.map(o => ({
        item: o._id,
        quantity: o.quantity,
        price: o.price,
      })),
      deliveryFee,
      contacts,
      lat,
      lon,
      address,
      distance,
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

  const onModifyItemQuantity = (searchResultId: string, quantity: number) => {
    const newSelectedItems = selectedItems.map(e => {
      if (e._id === searchResultId && quantity > 0) {
        e.quantity = quantity
      }
      return e
    })

    setSelectedItems(newSelectedItems)
    setCost(computeOrderCost(newSelectedItems))

    history.location.state = { selectedItems: newSelectedItems }
  }

  const onPrimaryAction = () => {
    setOrderConfirmationShown(true)
  }

  const onMapApiLoaded = async (map: google.maps.Map) => {
    mapRef.current = map
  }

  const getDeliveryFeeAndDistance = async () => {
    if (mapRef.current !== null) {
      // distance in m
      const distance: number | null = await computeDeliveryDistance(
        mapRef.current
      )

      if (distance !== null) {
        const { fee: deliveryFee } =
          await Requests.get<IItemRequestDetailsRequest>(
            `${endPoints['item-requests-delivery-details']}?distance=${distance}`
          )

        setDeliveryFee(deliveryFee)
        setDistance(distance)
      }
    }
  }

  const toolbarActions = [
    {
      text: 'Go to Cart',
      handler: onGoToCart,
    },
  ]

  useEffect(() => {
    getDeliveryFeeAndDistance()
    locationNotAvailableRef.current = lat === undefined || lon === undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current, lat, lon])

  const context = {
    cost,
    deliveryFee,
    selectedItems,
    locationNotAvailable,
    contacts,
    onModifyItemQuantity,
    onSelectDestination,
    onSetContacts: setContacts,
  }

  return (
    <IonPage className="order">
      <Header title={title} actions={toolbarActions} />
      <Context.Provider value={context}>
        <IonContent>
          <IonList lines="full" className="ion-no-padding">
            <SelectedItems />
            <DeliveryLocation />
            <DeliveryContact />
            <IonItem lines="none">
              <IonButton
                onClick={onPrimaryAction}
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
        onConfirm={onConfirmOrder}
        onDismiss={() => setOrderConfirmationShown(false)}
      />
      <div className="ion-hide">
        <MapContainer containerId="map-order" onMapApiLoaded={onMapApiLoaded} />
      </div>
    </IonPage>
  )
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
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Component)
