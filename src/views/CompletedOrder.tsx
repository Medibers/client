import React from 'react'
import Moment from 'moment'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import {
  IonBadge,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'
import { callOutline as call, close } from 'ionicons/icons'

import { Divider, Header, MapContainer } from 'components'

import { ItemRequest as ItemRequestInterface } from 'types'
import { platformIsMobile, requestStatesMappedToBadgeBackground } from 'utils'
import { userIsCourier, userIsNotClientUser } from 'utils/role'
import { stringifyOrderCost } from 'utils/charges'
import { formatMoney } from 'utils/currency'
import { callTelephone } from 'utils/msisdn'

import Routes from 'routes'

import { getDeliveryOrderContactsListed } from './Requests/utils'
import { getLocationState, redirectTo } from 'app-history'

interface ICompletedOrderProps {
  setItemRequest: (a: ItemRequestInterface) => {}
}

class CompletedOrder extends React.Component<ICompletedOrderProps> {
  locationState = getLocationState() as { request: ItemRequestInterface }

  callAction = () => {
    const { courier, user } = this.locationState.request

    return userIsCourier()
      ? `Call Client - ${user.name || user.phone}`
      : courier
      ? `Call Courier - ${courier.name || courier.phones[0] || ''}`
      : ''
  }

  onCall = () => {
    if (this.locationState.request === undefined) return null

    const { courier, user } = this.locationState.request

    const phone = userIsCourier()
      ? user.phone
      : courier
      ? courier.phones[0]
      : ''
    callTelephone(phone)
  }

  componentDidMount() {
    if (!this.locationState.request) {
      return redirectTo(Routes.requests.path)
    }
  }

  render() {
    if (!this.locationState.request) {
      return null
    }

    const {
      pharmacyItems,
      state: requestState,
      createdAt,
      courier,
      contacts,
      deliveryFee,
      lat,
      lon,
      distance,
      address,
      user,
    } = this.locationState.request

    const title = (
      <p className="ion-text-wrap">
        {pharmacyItems.map((o, i, a) => (
          <span key={i} className="no-wrap">
            {o.item['common-name'] || o.item['scientific-name']}
            {i < a.length - 1 ? <>,&nbsp;&nbsp;</> : null}
          </span>
        ))}
      </p>
    )

    const userCanViewRequestClient = userIsNotClientUser()
    const userCanViewCallButton =
      platformIsMobile && requestState === 'in transit'

    const cost = stringifyOrderCost(pharmacyItems, deliveryFee)

    return (
      <IonPage className="request-detail">
        <Header size="small" title={title} />
        <IonContent className="ion-no-padding">
          <IonLabel>
            <IonList lines="full" className="ion-no-padding">
              <IonItem>
                <IonLabel>
                  <p
                    style={{
                      marginBottom: 'unset',
                      lineHeight: 'unset',
                    }}
                  >
                    <IonBadge
                      style={{
                        background:
                          requestStatesMappedToBadgeBackground[requestState],
                      }}
                    >
                      {requestState}
                    </IonBadge>
                  </p>
                </IonLabel>
                <IonLabel>
                  <p className="ion-text-end">
                    Made {formatDate(createdAt)} ago
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonList lines="none" className="ion-padding">
              {pharmacyItems.map(({ item, price, quantity, currency }, i) => (
                <IonItem
                  key={i}
                  lines="none"
                  className="ion-no-padding mini-list-item"
                >
                  <h4>{item['common-name'] || item['scientific-name']}</h4>
                  <h4 slot="end">
                    {quantity}&nbsp;
                    <IonIcon style={{ fontSize: 12 }} icon={close} />
                    &nbsp;
                    {formatMoney(price, currency.name)}
                  </h4>
                </IonItem>
              ))}
              {deliveryFee && deliveryFee > 0 ? (
                <IonItem lines="none" className="ion-no-padding mini-list-item">
                  <h4 className="ion-label-primary italicize">Delivery Fee</h4>
                  <h4
                    slot="end"
                    className="flex ion-align-items-center ion-label-primary"
                  >
                    <b>{formatMoney(deliveryFee)}</b>
                  </h4>
                </IonItem>
              ) : null}
              <IonItem lines="none" className="ion-no-padding mini-list-item">
                <h4 className="ion-text-uppercase ion-label-primary">Total</h4>
                <h4
                  slot="end"
                  className="flex ion-align-items-center ion-label-primary"
                >
                  <b>{cost}</b>
                </h4>
              </IonItem>
            </IonList>
          </IonLabel>
          <Divider />
          <IonList className="fill-height ion-no-padding">
            {courier ? (
              <IonItem
                onClick={userCanViewCallButton ? this.onCall : undefined}
                button={userCanViewCallButton}
              >
                <IonLabel>
                  <h4>Courier Contact</h4>
                  <p className="ion-label-primary">
                    <b>{getDeliveryOrderContactsListed(courier.phones)}</b>
                  </p>
                </IonLabel>
                {userCanViewCallButton ? (
                  <IonIcon
                    className="ion-icon-secondary"
                    icon={call}
                    slot="end"
                  />
                ) : null}
              </IonItem>
            ) : null}
            {contacts ? (
              <IonItem>
                <IonLabel>
                  <h4>Client Delivery Contact</h4>
                  <p className="ion-label-primary">
                    <b>{getDeliveryOrderContactsListed(contacts)}</b>
                  </p>
                </IonLabel>
              </IonItem>
            ) : null}
            <IonItem lines="none">
              <IonLabel>
                <p className="ion-label-primary">
                  Delivery at <b>{address}</b>
                </p>
                {distance !== undefined && distance !== null ? (
                  <p className="ion-label-primary">
                    ~ <b>{distance}m</b>
                  </p>
                ) : null}
                {userCanViewRequestClient ? (
                  <p>Client - {user.name || user.phone}</p>
                ) : null}
              </IonLabel>
            </IonItem>
            <IonItem
              className="fill-height ion-no-padding"
              style={{
                position: 'relative',
                '--inner-padding-end': 0,
              }}
            >
              <MapContainer mapCenter={{ lat, lon }} />
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

function formatDate(date: number) {
  return Moment(date).fromNow()
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setItemRequest: payload => ({
        type: constants.SET_ITEM_REQUEST,
        payload,
      }),
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(CompletedOrder)
