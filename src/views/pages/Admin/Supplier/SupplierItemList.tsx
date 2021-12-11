import React, { useContext } from 'react'

import { IonList } from '@ionic/react'

import { indexIsLastInArray } from 'utils'

import SupplierItemListItem from './SupplierItemListItem'

import { SupplierContext } from './Supplier'

const SupplierItemList: React.FC = () => {
  const { items } = useContext(SupplierContext)

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
