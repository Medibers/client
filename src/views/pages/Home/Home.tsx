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

import { getLocationPath, getLocationQueryParameter } from 'app-history'

import { userIsClientUser } from 'utils/role'

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
    const redirectTo = getLocationQueryParameter('to')
    if (redirectTo) {
      window.location.replace(redirectTo)
      return
    }

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
    )
  }
}

export default Home
