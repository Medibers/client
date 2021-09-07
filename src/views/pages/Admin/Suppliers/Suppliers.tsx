import React from 'react'

import { IonContent, IonItem, IonPage } from '@ionic/react'
import { addCircleOutline as add } from 'ionicons/icons'
import { Header } from 'components'

import ContentHeader from '../ContentHeader'
import SupplierList from './SupplierList'

import { useGetSuppliers } from 'views/pages/Admin/hooks'

import Routes from 'routes'
import { navigateTo } from 'app-history'

const getCountText = (count: number) => {
  return count > 0
    ? `${count} supplier${count > 1 ? 's' : ''} registered`
    : 'No suppliers registered'
}

const toolbarActions = [
  {
    icon: add,
    handler: () => {
      navigateTo(Routes['supplier-add'].path)
    },
  },
]

const Suppliers: React.FC = () => {
  const [fetching, suppliers] = useGetSuppliers()

  if (fetching) return null

  const countText = getCountText(suppliers.length)

  return (
    <IonPage>
      <Header title="Suppliers" size="small" actions={toolbarActions} />
      <IonContent>
        <IonItem className="ion-no-margin" lines="none">
          <ContentHeader message={countText} />
        </IonItem>
        <SupplierList suppliers={suppliers} />
      </IonContent>
    </IonPage>
  )
}

export default Suppliers
