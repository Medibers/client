import React from 'react'
import { getDefaultRoute } from 'routes'

import {
  IonContent,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from '@ionic/react'

import { Header, Menu } from 'components'

import { getLocationPath } from 'app-history'

import getPageText from 'text'
import getMenuActions from 'views/pages/menu-actions'

import Categories from './Categories'
import DeliveryLocation from './DeliveryLocation'
import { getHomeToolbarActions } from './toolbar-actions'

interface IHomeProps {
  showMenu: (event: Event) => void
}

const Text = getPageText('home')

class Home extends React.Component<IHomeProps> {
  state = {
    renderContent: false,
  }

  componentDidMount() {
    const defaultRoute = getDefaultRoute()
    if (getLocationPath() !== defaultRoute) {
      window.location.replace(defaultRoute)
      return
    }

    this.setState({ renderContent: true })
  }

  render() {
    const { renderContent } = this.state
    return (
      renderContent && (
        <IonPage>
          <Header omitsBack actions={getHomeToolbarActions()} />
          <Menu actions={getMenuActions()} />
          <IonContent>
            <IonList className="ion-no-padding">
              <DeliveryLocation />
              <IonListHeader lines="full">
                <IonLabel>
                  <h3 style={{ fontSize: '105%' }}>
                    {Text['category-header']}
                  </h3>
                </IonLabel>
              </IonListHeader>
              <Categories />
            </IonList>
          </IonContent>
        </IonPage>
      )
    )
  }
}

export default Home
