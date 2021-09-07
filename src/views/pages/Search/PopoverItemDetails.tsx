import React from 'react'

import { IonItem, IonList } from '@ionic/react'
import { ImageSlider } from 'components'

import { ItemSearchResult } from 'types'

interface IPopoverItemDetails {
  result: ItemSearchResult | null
}

const wrapperStyle = {
  '--padding-start': 0,
  '--padding-end': 0,
  '--inner-padding-start': 0,
  '--inner-padding-end': 0,
}

const PopoverItemDetails: React.FC<IPopoverItemDetails> = ({ result }) => {
  if (result === null) return null

  const {
    item: { name },
    images: urls,
  } = result

  return (
    <IonList lines="full" className="ion-no-padding">
      <IonItem>{name}</IonItem>
      <IonItem style={wrapperStyle} lines="none">
        <ImageSlider urls={urls} imageStyle={{ height: '100%' }} />
      </IonItem>
    </IonList>
  )
}

export default PopoverItemDetails
