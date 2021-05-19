import React from 'react'
import Moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { CallNumber } from '@ionic-native/call-number'
import { platformIsMobile } from 'utils'

import { IonContent, IonPage, IonLabel, IonBadge, IonList, IonItem, IonButton, IonIcon, IonText } from '@ionic/react'
import { close } from 'ionicons/icons';

import { Header, Divider } from 'components'
import { MapContainer } from 'containers'

import { ItemRequest as ItemRequestInterface } from 'types'
import { requestStatesMappedToBadgeBackground } from 'utils'
import { userIsNotClientUser, userIsCourier } from 'utils/role'
import { deliveryCost, computeOrderCostAndDistance } from 'utils/charges'

import Requests, { endPoints } from 'requests'

type Props = {
  location: { state?: { request: ItemRequestInterface } },
  setItemRequest: (a: ItemRequestInterface) => {},
}

const callCourierButtonStyle = {
  position: 'absolute',
  top: 0,
  left: 0
}

class Component extends React.Component<Props> {

  state = {
    distance: (
      this.props.location.state !== undefined &&
      this.props.location.state.request !== undefined
    )
      ? this.props.location.state.request.aDistance
      : null
  }

  saveComputedDistance(distance: number) {
    const { location: { state }, setItemRequest } = this.props
    if (
      state === undefined ||
      state.request === undefined
    ) return null

    this.setState(
      { distance },
      () => setItemRequest({ ...state.request, aDistance: distance })
    )

    Requests.put(endPoints['item-requests'], {
      'item-requests': [state.request._id],
      update: { aDistance: distance }
    }).catch(console.error)

  }

  onMapApiLoaded = ({ map, maps }: any) => {

    const { distance = null } = this.state

    if (distance !== null) return // Directions Service already computed distance

    let directionsService = new maps.DirectionsService()
    let directionsRenderer = new maps.DirectionsRenderer()
    directionsRenderer.setMap(map)

    const origin = { lat: 40.7767644, lng: -73.9761399 }
    const destination = { lat: 40.771209, lng: -73.9673991 }

    const route = {
      origin,
      destination,
      travelMode: 'DRIVING'
    }

    directionsService.route(route, (response: any, status: any) => {
      if (status !== 'OK') {
        console.error('Directions request, status', status)
        return
      }

      // directionsRenderer.setDirections(response) // Render route on map

      const data = response.routes[0].legs[0] // Get first of possible routes

      if (data) {
        const { value: distanceInMetres, /* text */ } = data.distance
        this.saveComputedDistance(distanceInMetres)
      } else
        console.error('Directions data not returned', data)
    })

  }

  requestPresent = () => {
    const { location: { state } } = this.props
    return (
      state !== undefined &&
      state.request !== undefined
    )
  }

  callAction = () => {
    const { location: { state } } = this.props
    if (
      state === undefined ||
      state.request === undefined
    ) return null

    const { courier, user } = state.request

    return userIsCourier()
      ? `Call Client - ${user.name || user.phone}`
      : (
        courier ? `Call Courier - ${courier.name || courier.phones[0] || ''}` : ''
      )
  }

  onCall = () => {
    const { location: { state } } = this.props
    if (
      state === undefined ||
      state.request === undefined
    ) return null

    const { courier, user } = state.request

    const phone = userIsCourier() ? user.phone : (
      courier ? courier.phones[0] : ''
    )
    CallNumber.callNumber(`+${phone}`, true)
  }

  requestCost = this.props.location.state && this.props.location.state.request
    ? computeOrderCostAndDistance(
      this.props.location.state.request.pharmacyItems
    ).cost
    : 0

  render() {
    const { location: { state } } = this.props
    if (
      state === undefined ||
      state.request === undefined
    ) return null

    const { pharmacyItems, state: requestState, createdAt, courier, lat, lon, user } = state.request
    const { distance = null } = this.state

    const title = <p className="ion-text-wrap">{
      pharmacyItems.map((o, i) => <span key={i} className="flex-inline ion-align-items-center">
        {i > 0 ? <span>,&nbsp;&nbsp;</span> : null}
        {o.item['common-name'] || o.item['scientific-name']}
        {false ? <>
          <span>&nbsp;</span>
          <IonIcon icon={close} />
          <span>&nbsp;</span>
          {o.quantity}
        </> : null}
      </span>)
    }</p>

    const userCanViewRequestClient = userIsNotClientUser()
    const userCanViewCallButton = platformIsMobile && requestState === 'in transit'

    return (
      <IonPage className="request-detail">
        <Header size="small" title={title} />
        <IonContent className="ion-no-padding">
          <IonLabel>
            <IonList lines="full" className="ion-no-padding">
              <IonItem>
                <IonLabel>
                  <p style={{
                    marginBottom: 'unset', lineHeight: 'unset'
                  }}><IonBadge style={{
                    background: requestStatesMappedToBadgeBackground[requestState]
                  }}>{requestState}</IonBadge></p>
                </IonLabel>
                <IonLabel><p className="ion-text-end">Made {formatDate(createdAt)} ago</p></IonLabel>
              </IonItem>
            </IonList>
            <IonList lines="none" className="ion-padding">{
              pharmacyItems.map(({ item, price, quantity }, i) => (
                <IonItem
                  key={i}
                  lines="none"
                  className="ion-no-padding mini-list-item"
                >
                  <h4>{item['common-name'] || item['scientific-name']}</h4>
                  <h4 slot="end">
                    {quantity}&nbsp;
                    <IonIcon style={{ fontSize: 12 }} icon={close} />&nbsp;
                    UGX {price}
                  </h4>
                </IonItem>))
            }
              <IonItem
                lines="none"
                className="ion-no-padding mini-list-item"
              >
                <h4 className="ion-text-uppercase ion-label-primary">Total</h4>
                <h4 slot="end" className="flex ion-align-items-center ion-label-primary">
                  <b>UGX {this.requestCost}</b>
                </h4>
              </IonItem>
              <IonItem
                lines="none"
                className="ion-no-padding mini-list-item"
              >
                <IonText><IonLabel><p>Delivery fee</p></IonLabel></IonText>
                <h4 slot="end" className="flex ion-align-items-center">UGX {deliveryCost}</h4>
              </IonItem>
            </IonList>
          </IonLabel>
          <Divider />
          <IonList lines="none" className="fill-height ion-no-padding">
            <IonItem>
              <IonLabel>
                <p className="ion-label-primary">Delivery at <b>{`${lat}, ${lon}`}</b></p>
                {distance !== null
                  ? <p className="ion-label-primary">~ <b>{distance}m</b></p>
                  : null
                }
                {userCanViewRequestClient
                  ? <p>Client - {user.name || user.phone}</p>
                  : null}
              </IonLabel>
            </IonItem>
            <IonItem className="fill-height ion-no-padding" style={{
              position: 'relative',
              '--inner-padding-end': 0
            }}>
              <MapContainer mapCenter={{ lat, lon }} onMapApiLoaded={this.onMapApiLoaded} />
              {courier && userCanViewCallButton ? <IonButton onClick={this.onCall}
                style={callCourierButtonStyle}
                className="ion-margin"
              >
                {this.callAction()}
              </IonButton> : null}
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage >
    )
  }

}

function formatDate(date: number) {
  return Moment(date).fromNow()
}

// const mapStateToProps = (state: ReducerState) => ({
//   requests: state.App.requests || undefined
// })

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  setItemRequest: payload => ({
    type: constants.SET_ITEM_REQUEST,
    payload
  })
}, dispatch)

export default connect(null, mapDispatchToProps)(Component)
