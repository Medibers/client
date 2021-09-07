import React from 'react'

import { IonList } from '@ionic/react'

import SupplierListItem from './SupplierListItem'

import { indexIsLastInArray } from 'utils'

import { ISupplier } from '../types'

interface ISupplierList {
  suppliers: ISupplier[]
}

const SupplierList: React.FC<ISupplierList> = ({ suppliers }) => {
  return (
    <IonList lines="full" className="ion-no-padding">
      {suppliers.map((supplier, i, a) => (
        <SupplierListItem
          key={supplier._id}
          supplier={supplier}
          isLast={indexIsLastInArray(i, a)}
        />
      ))}
    </IonList>
  )
}

export default SupplierList
