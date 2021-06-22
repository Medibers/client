import React, { useContext } from 'react'
import { IonButton, IonFab } from '@ionic/react'
import { userIsClientUser } from 'utils/role'

import Routes from 'routes'
import { navigateTo } from 'app-history'

import Context from './context'

const actionTextWithActiveRequests = 'Make another order'
const actionTextWithoutActiveRequests = 'Make an order'

const OrderButton: React.FC = () => {
  const { activeRequests } = useContext(Context)

  const onClick = () => {
    navigateTo(Routes.search.path, {
      requestInitiatedFromRequestsPage: true,
      items: [],
    })
  }

  return userIsClientUser() ? (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonButton onClick={onClick} className="ion-action-primary">
        {activeRequests.length > 0
          ? actionTextWithActiveRequests
          : actionTextWithoutActiveRequests}
      </IonButton>
    </IonFab>
  ) : null
}

export default OrderButton
