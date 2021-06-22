import React, { useContext } from 'react'

import { close, pencilOutline, removeCircleOutline } from 'ionicons/icons'

import { formatMoney } from 'utils/currency'
import { costTextStyle, ionButtonStyle } from './styles'

import { Item as IItem } from 'types'
import { IonButton, IonIcon, IonItem } from '@ionic/react'

import Context from './context'

interface ISelectedItem {
  _id: string
  item: IItem
  price: number
  quantity?: number
}

const SelectedItem: React.FC<ISelectedItem> = ({
  _id,
  item,
  price,
  quantity,
}) => {
  const { onModifyItemQuantity, onRemoveItem } = useContext(Context)
  return (
    <IonItem lines="none" className="ion-no-padding mini-list-item">
      <h4>{item.name}</h4>
      {/* ion-grid, ion-toolbar don't work, try table */}
      <h4
        slot="end"
        style={costTextStyle}
        className="flex ion-align-items-center"
      >
        {quantity}&nbsp;
        <IonIcon style={{ fontSize: 12 }} icon={close} />
        &nbsp;
        {formatMoney(price)}
      </h4>
      <IonButton
        onClick={() => onModifyItemQuantity(_id)}
        slot="end"
        fill="clear"
        style={ionButtonStyle}
      >
        <IonIcon className="ion-icon-secondary" icon={pencilOutline} />
      </IonButton>
      <IonButton
        onClick={() => onRemoveItem(_id)}
        slot="end"
        fill="clear"
        style={ionButtonStyle}
      >
        <IonIcon className="ion-icon-secondary" icon={removeCircleOutline} />
      </IonButton>
    </IonItem>
  )
}

export default SelectedItem
