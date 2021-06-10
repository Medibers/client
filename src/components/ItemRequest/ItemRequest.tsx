import React from 'react'
import Moment from 'moment'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { IonButton, IonIcon, IonLabel } from '@ionic/react'

import {
  checkbox as active,
  ellipsisHorizontal as more,
  squareOutline as numb,
} from 'ionicons/icons'

import { ItemRequest as IItemRequest, MenuAction } from 'types'
import { requestStatesMappedToBadgeBackground } from 'utils'
import {
  userIsAdmin,
  userIsNotClientUser,
  userIsPharmacyOperator,
} from 'utils/role'
import { Menu as ActionMenu } from 'components'
import { TItemRequestClickAction } from 'pages/Requests/types'

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

interface IItemRequestProps {
  item: IItemRequest
  detailed: boolean
  selected: boolean
  selectModeOn: boolean
  onTap: (action: TItemRequestClickAction, request: string) => void
  actions: Array<MenuAction>
  showMenu: (event: Event) => void
}

const ItemRequest: React.FC<IItemRequestProps> = ({
  item: {
    _id,
    pharmacyItems,
    state,
    createdAt,
    courier,
    lat,
    lon,
    address,
    user,
  },
  detailed,
  selected,
  selectModeOn,
  onTap,
  actions,
  showMenu,
}) => {
  const onClick = (
    action: TItemRequestClickAction,
    item: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation()
    action === 'show-menu' && showMenu(event.nativeEvent)
    onTap(action, item)
  }

  const userCanViewRequestClient = userIsPharmacyOperator() || userIsAdmin()

  const menuButtonIsVisible =
    !selectModeOn && ['awaiting transit', 'in transit'].includes(state)

  return (
    <React.Fragment>
      {selectModeOn ? (
        <IonIcon
          icon={selected ? active : numb}
          slot="start"
          onClick={e =>
            onClick(
              userIsNotClientUser() ? 'select-item' : 'show-detail',
              _id,
              e
            )
          }
          className="ion-no-margin ion-icon-primary"
        />
      ) : (
        <div
          onClick={e =>
            onClick(
              userIsNotClientUser() ? 'select-item' : 'show-detail',
              _id,
              e
            )
          }
          className="fill-height"
          style={{ width: 'var(--ion-padding)' }}
        />
      )}
      <IonLabel
        className="ion-padding-vertical ion-no-margin spaced"
        onClick={e => onClick('show-detail', _id, e)}
      >
        <h2
          className={
            'ion-label-primary ' + (detailed ? 'ion-text-wrap' : 'ellipses')
          }
        >
          {pharmacyItems.map(
            (o, i) =>
              (i > 0 ? ', ' : '') +
              (o.item['common-name'] || o.item['scientific-name'])
          )}
        </h2>
        <h4 className="flex ion-align-items-center">
          <span
            style={{
              backgroundColor: requestStatesMappedToBadgeBackground[state],
            }}
            className="request-badge"
          />
          &nbsp;&nbsp;
          {state}
        </h4>
        {lat !== undefined && lon !== undefined ? (
          <p>Delivery at {address}</p>
        ) : null}
        {detailed ? (
          <>
            {userCanViewRequestClient ? (
              <p>Client - {user.name || user.phone}</p>
            ) : null}
            {courier ? <p>Courier - {`${courier.name}`}</p> : null}
          </>
        ) : null}
      </IonLabel>
      <IonLabel
        className="one-line"
        style={{
          minWidth: 'fit-content',
          maxWidth: 'fit-content',
        }}
        slot="end"
      >
        <p className="ion-text-end">{formatDate(createdAt)}</p>
      </IonLabel>
      {menuButtonIsVisible && (
        <IonButton
          onClick={e => onClick('show-menu', _id, e)}
          slot="end"
          fill="clear"
        >
          <IonIcon className="ion-icon-primary" icon={more} />
        </IonButton>
      )}
      <ActionMenu id={_id} actions={actions} />
    </React.Fragment>
  )
}

function formatDate(date: number) {
  return Moment(date).fromNow()
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showMenu: (payload: Event) => ({
        type: constants.SHOW_MENU,
        payload,
      }),
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(ItemRequest)
