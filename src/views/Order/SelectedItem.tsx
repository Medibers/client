import React, { useContext } from 'react'

import { addCircleOutline, close, removeCircleOutline } from 'ionicons/icons'

import { formatMoney } from 'utils/currency'
import { costTextStyle, ionButtonStyle } from './styles'

import { ICurrency, IItem } from 'types'
import { IonButton, IonIcon, IonItem } from '@ionic/react'

import Context from './context'

interface ISelectedItem {
  _id: string
  item: IItem
  currency: ICurrency
  price: number
  quantity?: number
}

const SelectedItem: React.FC<ISelectedItem> = ({
  _id,
  item,
  currency,
  price,
  quantity = 1,
}) => {
  const { onModifyItemQuantity } = useContext(Context)

  return (
    <IonItem lines="none" className="ion-no-padding mini-list-item">
      <h4 className="wrap">{item.name}</h4>
      <h4
        slot="end"
        style={costTextStyle}
        className="flex ion-align-items-center ion-margin-left"
      >
        {quantity}&nbsp;
        <IonIcon style={{ fontSize: 12 }} icon={close} />
        &nbsp;
        {formatMoney(price, currency.name)}
      </h4>
      <IonButton
        size="large"
        onClick={() => onModifyItemQuantity(_id, quantity - 1)}
        slot="end"
        fill="clear"
        style={ionButtonStyle}
      >
        <IonIcon className="ion-icon-secondary" icon={removeCircleOutline} />
      </IonButton>
      <IonButton
        size="large"
        onClick={() => onModifyItemQuantity(_id, quantity + 1)}
        slot="end"
        fill="clear"
        style={ionButtonStyle}
      >
        <IonIcon className="ion-icon-secondary" icon={addCircleOutline} />
      </IonButton>
    </IonItem>
  )
}

export default SelectedItem
