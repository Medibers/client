import React from 'react'

import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import getPageText from 'text'

import { chevronDown as down, chevronUp as up } from 'ionicons/icons'

const Text = getPageText('item-request-list')

interface ICompleteItemRequestListToggle {
  completeRequestsShown: boolean
  onToggleCompleteOrders: () => void
}

const CompleteItemRequestListToggle: React.FC<ICompleteItemRequestListToggle> =
  ({ completeRequestsShown, onToggleCompleteOrders }) => {
    return (
      <IonItem
        button
        onClick={onToggleCompleteOrders}
        className="ion-item-archive"
        lines="none"
      >
        <IonLabel className="ion-no-margin">
          <p className="ion-label-secondary">
            {completeRequestsShown
              ? Text['hide-toggled-list']
              : Text['show-toggled-list']}
          </p>
        </IonLabel>
        <IonIcon
          className="ion-no-margin ion-icon-secondary"
          icon={completeRequestsShown ? up : down}
          slot="end"
        ></IonIcon>
      </IonItem>
    )
  }

export default CompleteItemRequestListToggle
