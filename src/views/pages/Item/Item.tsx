import React from 'react'
import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { pencil as edit } from 'ionicons/icons'

import { ItemSearchResult } from 'types'

import { Header } from 'components'

import { getItemState } from 'utils'
import { formatMoney } from 'utils/currency'
import { userIsClientUser } from 'utils/role'

import Routes from 'routes'
import { getLocationState, navigateTo } from 'app-history'

import Images from './Images'
import ListedDetails from './ListedDetails'
import CountryOrigin from './CountryOrigin'
import Description from './Description'

interface IItemProps {
  location: {
    state: ItemSearchResult
  }
}

const toolbarActions = userIsClientUser()
  ? undefined
  : [
      {
        icon: edit,
        handler: () => {
          navigateTo(Routes['item-update'].path, getLocationState())
        },
      },
    ]

class Component extends React.Component<IItemProps> {
  title = this.props.location.state.item
    ? this.props.location.state.item.name
    : 'Unknown item'

  render() {
    const { item, price, images, available } = this.props.location.state || {}

    return (
      <IonPage>
        <Header title={this.title} actions={toolbarActions} />
        {item ? (
          <IonContent className="ion-padding">
            <IonList lines="none">
              <Images urls={images} />
              <IonItem className="ion-no-padding ion-margin-top">
                <IonLabel>
                  <h4>
                    <b>{formatMoney(price)}</b>
                  </h4>
                  <h4>{getItemState(available)}</h4>
                </IonLabel>
              </IonItem>
              <Description description={item.description} />
              <ListedDetails details={item.specification} />
              <ListedDetails details={item.more} />
              <CountryOrigin country={item['country-origin']} />
            </IonList>
          </IonContent>
        ) : null}
      </IonPage>
    )
  }
}

export default Component
