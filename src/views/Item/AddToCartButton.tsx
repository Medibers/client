import React, { useMemo } from 'react'
import { IonButton, IonFab, IonIcon } from '@ionic/react'
import {
  cartOutline as addToCartIcon,
  cart as removeFromCartIcon,
} from 'ionicons/icons'

import { ItemSearchResult as IItemSearchResult } from 'types'
import { userIsNotClientUser } from 'utils/role'

import { addToCart, removeFromCart } from 'store/utils'

interface IAddToCartButton {
  selectedItems: IItemSearchResult[]
  result: IItemSearchResult
}

const AddToCartButton: React.FC<IAddToCartButton> = ({
  selectedItems,
  result,
}) => {
  const itemInCart = useMemo(
    () => selectedItems.some(({ _id }) => _id === result._id),
    [selectedItems, result._id]
  )

  if (userIsNotClientUser()) return null

  const onCartButtonClick = () => {
    if (itemInCart) {
      removeFromCart(result._id)
    } else {
      addToCart(result)
    }
  }

  return (
    <IonFab
      className="ion-margin"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <IonButton className="ion-action-primary" onClick={onCartButtonClick}>
        <IonIcon icon={itemInCart ? removeFromCartIcon : addToCartIcon} />
        &nbsp;&nbsp;
        {itemInCart ? 'Remove from' : 'Add to'} Cart
      </IonButton>
    </IonFab>
  )
}

export default AddToCartButton
