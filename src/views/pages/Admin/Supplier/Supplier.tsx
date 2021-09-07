import React, { useMemo } from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { addCircleOutline as add } from 'ionicons/icons'
import { pencil as edit } from 'ionicons/icons'

import ContentHeader from '../ContentHeader'
import SupplierItemList from './SupplierItemList'

import { Header } from 'components'

import Routes from 'routes'
import { getLocationState, navigateTo } from 'app-history'

import { useGetSupplierItems } from 'views/pages/Admin/hooks'
import { ISupplier } from 'views/pages/Admin/types'

const getCountText = (count: number, supplier: string) => {
  return count > 0
    ? `${count} item${count > 1 ? 's' : ''} registered`
    : 'No items registered for ' + supplier
}

const toolbarActions = [
  {
    icon: add,
    handler: () => {
      const supplier = getLocationState<ISupplier>()
      navigateTo(Routes['supplier-item-add'].path, supplier)
    },
  },
  {
    icon: edit,
    handler: () => {
      const supplier = getLocationState<ISupplier>()
      navigateTo(Routes['supplier-update'].path, supplier)
    },
  },
]

const Supplier: React.FC = () => {
  const supplier = useMemo(() => getLocationState<ISupplier>(), [])

  const [fetching, items] = useGetSupplierItems(supplier._id)

  const countText = getCountText(items.length, supplier.name)

  return (
    <IonPage>
      <Header title={supplier.name} actions={toolbarActions} size="small" />
      <IonContent>
        <IonItem className="ion-no-margin" lines="none">
          <ContentHeader message={countText} />
        </IonItem>
        {fetching ? null : <SupplierItemList items={items} />}
      </IonContent>
    </IonPage>
  )
}

export default Supplier
