import React, { Dispatch, SetStateAction, useState } from 'react'

import { IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { send } from 'ionicons/icons'

import { Popover } from 'components'

type ItemQuantityProps = {
  open: boolean
  item: string | null
  onSubmit: (e: string) => void
}

const ItemQuantity: React.FC<ItemQuantityProps> = ({
  open,
  item,
  onSubmit,
}) => {
  const [value, setValue]: [string, Dispatch<SetStateAction<string>>] =
    useState('')

  const onQtyPopoverPresented = () => {
    // eslint-disable-next-line no-undef
    const e: HTMLIonInputElement | null = document.querySelector(
      'ion-popover ion-input'
    )
    e && e.setFocus()
  }

  return (
    <Popover
      open={open}
      onPresent={onQtyPopoverPresented}
      cssClass="popover-wide"
    >
      <IonList className="ion-no-padding">
        <IonItem lines="none">
          <IonLabel>
            <h2 className="ion-text-wrap ion-label-primary">
              Type new quantity for {item}
            </h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="for example 2"
            onIonChange={e => setValue(`${e.detail.value}`)}
            type="number"
            name="quantity"
            min="1"
          />
        </IonItem>
        <IonItem button onClick={() => onSubmit(value)}>
          <IonIcon className="ion-icon-primary" icon={send}></IonIcon>
        </IonItem>
      </IonList>
    </Popover>
  )
}

export default ItemQuantity
