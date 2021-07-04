import React, { useContext } from 'react'

import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'

import SelectedItem from './SelectedItem'

import Context from './context'

import { ionButtonStyle } from './styles'
import { formatMoney } from 'utils/currency'

const SelectedItems: React.FC = () => {
  const { cost, selectedItems, onAddItem } = useContext(Context)
  return (
    <IonItem>
      <IonLabel>
        <p>Items</p>
        <IonList className="ion-no-margin ion-no-padding">
          {selectedItems.map(({ _id, item, price, quantity }) => (
            <SelectedItem
              key={_id}
              _id={_id}
              item={item}
              price={price}
              quantity={quantity}
            />
          ))}
          <IonItem lines="none" className="ion-no-padding mini-list-item">
            <IonButton
              onClick={onAddItem}
              slot="end"
              fill="clear"
              style={ionButtonStyle}
            >
              <IonIcon className="ion-icon-secondary" icon={addCircleOutline} />
            </IonButton>
          </IonItem>
          <IonItem
            lines="none"
            className="ion-no-padding mini-list-item"
            style={{ '--min-height': '25px' }}
          >
            <IonLabel className="ion-no-margin ion-text-uppercase ion-label-primary">
              <h4>Total</h4>
            </IonLabel>
            <h4 className="ion-label-primary" slot="end">
              {formatMoney(cost)}
            </h4>
          </IonItem>
        </IonList>
      </IonLabel>
    </IonItem>
  )
}

export default SelectedItems
