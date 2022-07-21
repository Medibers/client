import React from 'react'

import {
  IonContent,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from '@ionic/react'

import { Header, Menu } from 'components'

import { userIsClientUser } from 'utils/role'

import getPageText from 'text'
import getMenuActions from 'views/menu-actions'

import Categories from './Categories'
import DeliveryLocation from './DeliveryLocation'
import { getHomeToolbarActions } from './toolbar-actions'

interface IHomeProps {
  showMenu: (event: Event) => void
}

const Text = getPageText('home')

const Home: React.FC<IHomeProps> = () => {
  return (
    <IonPage>
      <Header omitsBack actions={getHomeToolbarActions()} />
      <Menu actions={getMenuActions()} />
      <IonContent>
        <IonList className="ion-no-padding">
          {userIsClientUser() ? (
            <React.Fragment>
              <DeliveryLocation />
              <IonListHeader lines="full">
                <IonLabel>
                  <h3 style={{ fontSize: '105%' }}>
                    {Text['category-header']}
                  </h3>
                </IonLabel>
              </IonListHeader>
            </React.Fragment>
          ) : null}

          <Categories />
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Home
