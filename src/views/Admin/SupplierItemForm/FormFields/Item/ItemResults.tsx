import React from 'react'
import { IonItem, IonList } from '@ionic/react'

import { IItem } from 'views/Admin/types'

const searchResultsDivStyle: Object = {
  minWidth: 200,
  maxHeight: 'calc(40vh)', // 100% - 2 * top
  overflowY: 'auto',
  position: 'absolute',
  top: 60,
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, .8)',
  zIndex: 2,
}

interface IItemResults {
  results: IItem[]
  onItemResultClick: (result: IItem) => void
}

const ItemResults: React.FC<IItemResults> = ({
  results,
  onItemResultClick,
}) => {
  return (
    <div
      style={{
        ...searchResultsDivStyle,
        visibility: results.length ? 'visible' : 'hidden',
      }}
    >
      <IonList lines="none" className="ion-no-padding">
        {results.map((result, i) => (
          <IonItem key={i} onClick={() => onItemResultClick(result)} button>
            {result.name}
          </IonItem>
        ))}
      </IonList>
    </div>
  )
}

export default ItemResults
