import React, { useContext } from 'react'

import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react'

import SelectedItem from './SelectedItem'

import Context from './context'

import { addItemIonButtonStyle } from './styles'
import { formatMoney } from 'utils/currency'

const SelectedItems: React.FC = () => {
  const { cost, selectedItems, onModifyCart } = useContext(Context)
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
          <IonItem lines="none" className="ion-no-padding mini-list-item">
            <IonButton
              onClick={onModifyCart}
              color="secondary"
              slot="end"
              style={addItemIonButtonStyle}
            >
              Modify Cart
            </IonButton>
          </IonItem>
        </IonList>
      </IonLabel>
    </IonItem>
  )
}

export default SelectedItems
