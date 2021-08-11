import React, { useContext } from 'react'

import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react'

import SelectedItem from './SelectedItem'

import Context from './context'

import { addItemIonButtonStyle } from './styles'
import { formatMoney } from 'utils/currency'

const ionItemStyle = { height: '20px' }

const SelectedItems: React.FC = () => {
  const {
    cost: itemCost,
    deliveryFee,
    selectedItems,
    onModifyCart,
  } = useContext(Context)

  const totalCost = itemCost + (deliveryFee || 0)

  return (
    <IonItem>
      <IonLabel>
        <p>Cart</p>
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
              onClick={onModifyCart}
              color="secondary"
              slot="end"
              style={addItemIonButtonStyle}
            >
              Modify Cart
            </IonButton>
          </IonItem>
          <IonItem
            lines="none"
            className="ion-no-padding mini-list-item"
            style={ionItemStyle}
          >
            <IonLabel className="ion-no-margin ion-label-primary">
              <h4 className="italicize">Delivery Fee</h4>
            </IonLabel>
            <h4 className="ion-label-primary" slot="end">
              {formatMoney(deliveryFee || 0)}
            </h4>
          </IonItem>
          <IonItem
            lines="none"
            className="ion-no-padding mini-list-item"
            style={{ ...ionItemStyle, marginTop: '5px' }}
          >
            <IonLabel className="ion-no-margin ion-text-uppercase ion-label-primary">
              <h4>Total</h4>
            </IonLabel>
            <h4 className="ion-label-primary" slot="end">
              {formatMoney(totalCost)}
            </h4>
          </IonItem>
        </IonList>
      </IonLabel>
    </IonItem>
  )
}

export default SelectedItems
