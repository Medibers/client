import React, { useContext } from 'react'

import { IonItem, IonLabel, IonList } from '@ionic/react'

import SelectedItem from './SelectedItem'

import Context from './context'

import { formatMoney } from 'utils/currency'

const ionItemStyle = { height: '20px' }

const SelectedItems: React.FC = () => {
  const { cost: itemCost, deliveryFee, selectedItems } = useContext(Context)

  const totalCost = itemCost + (deliveryFee || 0)

  return (
    <IonItem>
      <IonLabel>
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
            style={ionItemStyle}
          >
            <IonLabel className="ion-no-margin ion-label-primary">
              <h4 className="italicize">
                {deliveryFee && deliveryFee > 0
                  ? 'Delivery Fee'
                  : 'Delivery Fee will be determined after your order'}
              </h4>
            </IonLabel>
            <h4 className="ion-label-primary" slot="end">
              {deliveryFee && deliveryFee > 0 ? formatMoney(deliveryFee) : null}
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
