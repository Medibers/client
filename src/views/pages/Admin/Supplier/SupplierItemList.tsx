import React from 'react'

import { IonList } from '@ionic/react'

import SupplierItemListItem from './SupplierItemListItem'

import { indexIsLastInArray } from 'utils'
import { ISupplierItem } from 'views/pages/Admin/types'

interface ISupplierList {
  items: ISupplierItem[]
}

const SupplierItemList: React.FC<ISupplierList> = ({ items }) => {
  return (
    <IonList lines="full" className="ion-no-padding">
      {items.map((item, i, a) => (
        <SupplierItemListItem
          key={item._id}
          supplierItem={item}
          isLast={indexIsLastInArray(i, a)}
        />
      ))}
    </IonList>
  )
}

export default SupplierItemList
