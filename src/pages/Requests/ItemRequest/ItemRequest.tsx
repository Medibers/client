import React, { useContext, useState } from 'react'
import Moment from 'moment'

import { IonButton, IonIcon, IonLabel } from '@ionic/react'

import {
  checkbox as active,
  ellipsisHorizontal as more,
  squareOutline as numb,
} from 'ionicons/icons'

import Routes from 'routes'
import { navigateTo } from 'app-history'
import { showMenu } from 'store/utils'

import { ItemRequest as IItemRequest } from 'types'
import { requestStatesMappedToBadgeBackground } from 'utils'
import {
  userIsAdmin,
  userIsClientUser,
  userIsNotClientUser,
  userIsPharmacyOperator,
} from 'utils/role'
import { Menu as ActionMenu } from 'components'

import Context from 'pages/Requests/context'

import getItemRequestMenuActions from './menu-actions'

import getPageText from 'text'
import { getDeliveryOrderContactsListed } from '../utils'

type TItemRequestClickAction = 'show-menu' | 'show-detail' | 'select-item'

interface IItemRequestProps {
  item: IItemRequest
  selected: boolean
}

const Text = getPageText('item-request')

const ItemRequest: React.FC<IItemRequestProps> = ({ item, selected }) => {
  const context = useContext(Context)
  const actions = getItemRequestMenuActions.call(context)

  const [detailed, setDetailed] = useState(false)

  const onClick = (
    event: React.MouseEvent,
    action: TItemRequestClickAction
  ) => {
    event.stopPropagation()
    switch (action) {
      case 'select-item':
        context.onItemSelected(item._id)
        break
      case 'show-detail':
        if (userIsClientUser()) {
          const requests = [
            ...context.archivedRequests,
            ...context.activeRequests,
          ]
          navigateTo(Routes.request.path, {
            request: requests.find(({ _id }) => _id === item._id),
          })
        } else setDetailed(!detailed)
        break
      case 'show-menu':
        context.onItemSelectedFromActionMenu(item._id)
        showMenu(event.nativeEvent, item._id)
        break
      default:
        break
    }
  }

  const userCanViewRequestClient = userIsPharmacyOperator() || userIsAdmin()

  const menuButtonIsVisible =
    !context.selectModeOn &&
    ['awaiting transit', 'in transit'].includes(item.state)

  return (
    <React.Fragment>
      {context.selectModeOn ? (
        <IonIcon
          className="ion-no-margin ion-icon-primary"
          icon={selected ? active : numb}
          slot="start"
          onClick={event =>
            onClick(
              event,
              userIsNotClientUser() ? 'select-item' : 'show-detail'
            )
          }
        />
      ) : (
        <div
          className="fill-height"
          style={{ width: 'var(--ion-padding)' }}
          onClick={event =>
            onClick(
              event,
              userIsNotClientUser() ? 'select-item' : 'show-detail'
            )
          }
        />
      )}
      <IonLabel
        className="ion-padding-vertical ion-no-margin spaced"
        onClick={event => onClick(event, 'show-detail')}
      >
        <h2
          className={`ion-label-primary ${
            detailed ? 'ion-text-wrap' : 'ellipses'
          }`}
        >
          {item.pharmacyItems
            .map(({ item }) => item['common-name'] || item['scientific-name'])
            .join(', ')}
        </h2>
        <p className="flex ion-align-items-center">
          <span
            style={{
              backgroundColor: requestStatesMappedToBadgeBackground[item.state],
            }}
            className="request-badge"
          />
          &nbsp;&nbsp;
          {item.state}
        </p>
        {detailed ? (
          <React.Fragment>
            {item.courier && (
              <h4>
                {Text['assigned-to']} {`${item.courier.name}`}
              </h4>
            )}
            {item.lat && item.lon && (
              <h4>
                {Text['delivery-at']} {item.address}
              </h4>
            )}
            {item.contacts && item.contacts.length > 0 && (
              <h4>
                {Text['delivery-contact']}{' '}
                {getDeliveryOrderContactsListed(item.contacts)}
              </h4>
            )}
            {userCanViewRequestClient && (
              <h4>
                {Text['made-by']} {item.user.name || item.user.phone}
              </h4>
            )}
          </React.Fragment>
        ) : (
          item.lat &&
          item.lon && (
            <h4>
              {Text['delivery-at']} {item.address}
            </h4>
          )
        )}
      </IonLabel>
      <IonLabel
        className="one-line"
        style={{
          minWidth: 'fit-content',
          maxWidth: 'fit-content',
        }}
        slot="end"
      >
        <p className="ion-text-end">{formatDate(item.createdAt)}</p>
      </IonLabel>
      {menuButtonIsVisible && (
        <IonButton
          onClick={event => onClick(event, 'show-menu')}
          slot="end"
          fill="clear"
        >
          <IonIcon className="ion-icon-primary" icon={more} />
        </IonButton>
      )}
      <ActionMenu menuId={item._id} entityId={item._id} actions={actions} />
    </React.Fragment>
  )
}

Moment.updateLocale('en', {
  relativeTime: {
    past: '%s',
    s: '1s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
})

function formatDate(date: number) {
  return Moment(date).fromNow()
}

export default ItemRequest
