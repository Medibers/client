import React from 'react'
import { IonButton } from '@ionic/react'
import { userIsNotClientUser } from 'utils/role'

type Props = {
  onClick: () => void
  requestsReturned?: boolean
  activeRequestsPresent?: boolean
}

const actionTextWithActiveRequests = 'Make another order'
const actionTextWithoutActiveRequests = 'Make an order'

const OrderButton: React.FC<Props> = ({
  onClick,
  requestsReturned,
  activeRequestsPresent,
}) => {
  if (userIsNotClientUser() || !requestsReturned) return null

  return (
    <div className="ion-padding">
      <IonButton onClick={onClick} className="ion-no-margin ion-action-primary">
        {activeRequestsPresent
          ? actionTextWithActiveRequests
          : actionTextWithoutActiveRequests}
      </IonButton>
    </div>
  )
}

export default OrderButton
