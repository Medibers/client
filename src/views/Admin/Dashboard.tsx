import React from 'react'

import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
} from '@ionic/react'
import { Header } from 'components'

import { CATEGORIES_URL, SUPPLIERS_URL } from 'routes'

import { navigateTo } from 'app-history'

// Suppliers
// Items
// Couriers
// Categories
// Units

const Admin: React.FC = () => {
  const dashboardItems = [
    {
      label: 'Suppliers & Service Providers',
      url: SUPPLIERS_URL,
      description: '',
    },
    // {
    //   label: 'All Unique Items and Services',
    //   description: '',
    // },
    // {
    //   label: 'Couriers',
    //   description: '',
    // },
    {
      label: 'Categories',
      url: CATEGORIES_URL,
      description: '',
    },
    // {
    //   label: 'Units of Count',
    //   description: '',
    // },
  ]

  return (
    <IonPage>
      <Header title="Dashboard" />
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            {dashboardItems.map(({ label, url, description }) => (
              <IonCol
                key={label}
                className="admin-dashboard-category ion-padding"
                sizeXs="12"
                sizeSm="6"
                sizeMd="4"
                onClick={() => navigateTo(url)}
              >
                <IonLabel>
                  <h4>{label}</h4>
                  <p>{description}</p>
                </IonLabel>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Admin
