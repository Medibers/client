import React, { useContext, useMemo } from 'react'

import { IonItem, IonLabel, IonList } from '@ionic/react'

import SelectedItem from './SelectedItem'

import Context from './context'

import { stringifyOrderCost } from 'utils/charges'
import { formatMoney } from 'utils/currency'

const SelectedItems: React.FC = () => {
  const { deliveryFee, selectedItems } = useContext(Context)

  const cost = useMemo(
    () => stringifyOrderCost(selectedItems, deliveryFee),
    [selectedItems, deliveryFee]
  )

  return (
    <IonItem>
      <IonLabel>
        <IonList className="ion-no-margin ion-no-padding">
          {selectedItems.map(({ _id, item, currency, price, quantity }) => (
            <SelectedItem
              key={_id}
              _id={_id}
              item={item}
              currency={currency}
              price={price}
              quantity={quantity}
            />
          ))}
          <IonItem lines="none" className="ion-no-padding mini-list-item">
            <IonLabel className="ion-no-margin ion-label-primary wrap">
              <h4 className="italicize">
                {deliveryFee && deliveryFee > 0
                  ? 'Delivery Fee'
                  : 'Delivery Fee will be determined after your order'}
              </h4>
            </IonLabel>
            {deliveryFee && deliveryFee > 0 ? (
              <h4 className="ion-label-primary" slot="end">
                {formatMoney(deliveryFee)}
              </h4>
            ) : null}
          </IonItem>
          <IonItem
            lines="none"
            className="ion-no-padding mini-list-item"
            style={{ marginTop: '5px' }}
          >
            <IonLabel className="ion-no-margin ion-text-uppercase ion-label-primary">
              <h4>Total</h4>
            </IonLabel>
            <div slot="end">
              <h4 className="ion-label-primary">{cost}</h4>
            </div>
          </IonItem>
        </IonList>
      </IonLabel>
    </IonItem>
  )
}

export default SelectedItems
