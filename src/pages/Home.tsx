import React from 'react'
import Routes, { getDefaultRoute } from 'routes'
import { History } from 'history'

import {
  IonContent, IonPage, IonList,
  IonItem, IonLabel, IonIcon,
  IonListHeader
} from '@ionic/react'
import {
  person,
  bicycle as requestsIcon,
  locationSharp as locationIcon
} from 'ionicons/icons'

import { Header } from 'components'

import { userIsClientUser, userIsNotClientUser } from 'utils/role'

import { getActiveRequestsPresence } from 'session'
import { getDeliveryLocationForNextOrder } from 'location'

import { getAddress } from 'utils'

import ItemCategories from 'utils/item-category-map'
import getPageText from 'text'

export type Props = {
  history: History,
  location: { pathname: string }
}

const Text = getPageText('home')

const itemCategories = Object.keys(ItemCategories)
  .filter((k, i) => i)
  .map((key: string) =>
    ({ ...ItemCategories[key], value: key })
  )

class Component extends React.Component<Props> {

  state = { renderContent: false }

  componentDidMount() {
    const defaultRoute = getDefaultRoute()
    if (this.props.location.pathname !== defaultRoute) {
      window.location.replace(defaultRoute)
      return
    }

    const activeRequestsPresent = (
      userIsClientUser() && getActiveRequestsPresence()
    )

    if (activeRequestsPresent)
      this.props.history.push(Routes.requests.path)
    else if (userIsNotClientUser())
      window.location.replace(Routes.requests.path)
    else
      this.setState({ renderContent: true })
  }

  toolbarActions = () => [{
    icon: requestsIcon,
    handler: () => this.props.history.push(Routes.requests.path)
  }, {
    icon: person,
    handler: () => this.props.history.push(Routes.account.path)
  }]

  onSelectCategory = (category: string) => {
    this.props.history.push(Routes.search.path, { category })
  }

  onChangeDeliveryLocation = () => {
    this.props.history.push(Routes.location.path)
  }

  render() {
    const { lat, lon } = getDeliveryLocationForNextOrder()
    return (
      this.state.renderContent ? <IonPage>
        <Header omitsBack actions={this.toolbarActions()} />
        <IonContent>
          <IonList className="ion-no-padding">
            <IonItem className="ion-margin-bottom" lines="none" onClick={this.onChangeDeliveryLocation} button>
              <IonIcon slot="start" icon={locationIcon} className="ion-icon-secondary" size="large" />
              <IonLabel>
                <p>{Text['delivery-to']}</p>
                <h3>{getAddress(lat, lon)}</h3>
              </IonLabel>
            </IonItem>
            <IonListHeader lines="full">
              <IonLabel><h3>{Text['category-header']}</h3></IonLabel>
            </IonListHeader>{
              itemCategories.map(({ icon, label, description, value }, i, a) => (
                <CategoryComponent
                  key={i}
                  lines={i < a.length - 1 ? 'inset' : 'none'}
                  label={label}
                  description={description}
                  icon={icon}
                  onSelect={() => this.onSelectCategory(value)}
                />
              ))
            }</IonList>
        </IonContent>
      </IonPage> : null
    )
  }

}

const CategoryComponent: React.FC<{
  lines: 'inset' | 'none',
  label: string,
  description: string,
  icon: string,
  onSelect: () => void
}> = ({ lines, label, description, icon, onSelect }) => (
  <IonItem button onClick={onSelect} lines={lines}>
    <IonIcon slot="start" icon={icon} size="large" />
    <IonLabel>
      <h3>{label}</h3>
      <p>{description}</p>
    </IonLabel>
  </IonItem>
)

export default Component
