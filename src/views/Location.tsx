import React from 'react'

import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
} from '@ionic/react'

import { Header, MapContainer } from 'components'

import { setDeliveryLocation } from 'session'
import { queryAddress, queryPlace } from 'location'

import { closeSharp, search } from 'ionicons/icons'

import { Location as LocationInterface } from 'types'
import { goBack } from 'app-history'

const title = 'Delivery Location'
const primaryAction = 'Select Location'

const actionButtonStyle = {
  position: 'absolute',
  bottom: 0,
}

const searchResultsDivStyle: Object = {
  minWidth: 200,
  maxHeight: 'calc(100% - 20px)', // 100% - 2 * top
  overflowY: 'auto',
  position: 'absolute',
  top: 10,
  right: 10,
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, .8)',
}

const searchPlaceholder = 'Search by address'

interface IState {
  location: LocationInterface | null
  searchShown: Boolean
  results: Array<google.maps.places.PlaceResult>
}

class Component extends React.Component {
  state: IState = {
    location: null,
    searchShown: false,
    results: [],
  }

  onPrimaryAction = async () => {
    const { location } = this.state
    if (location) {
      const { lat, lon } = location
      const address = await queryAddress(lat, lon)
      setDeliveryLocation({ lat, lon, address })
    }
    goBack()
  }

  setLocation = (location: LocationInterface) => this.setState({ location })
  setSearchShown = (v: Boolean) => this.setState({ searchShown: v })

  map: google.maps.Map | undefined

  onMapApiLoaded = (map: google.maps.Map) => {
    this.map = map
  }

  onSearch = async (value: string) => {
    const results = await queryPlace(this.map, value)
    this.setState({ results })
  }

  onPlacesResultClick = (result: google.maps.places.PlaceResult) => {
    this.map && result.geometry && this.map.setCenter(result.geometry.location)
    this.setState({ results: [] })
  }

  onIonCancel = () => this.setState({ searchShown: false, results: [] })

  toolbarActions = (searchShown: Boolean) =>
    searchShown
      ? [
          {
            component: this.searchComponent,
            handler: () => {},
          },
        ]
      : [
          {
            icon: search,
            handler: () => this.setSearchShown(true),
          },
        ]

  // eslint-disable-next-line no-undef
  searchRef: HTMLIonSearchbarElement | null = null

  searchComponent = () => (
    <IonSearchbar
      ref={node => (this.searchRef = node)}
      style={{
        '--cancel-button-color': 'var(--ion-color-primary)',
        '--icon-color': 'var(--ion-color-primary)',
        '--color': 'var(--ion-color-primary)',
      }}
      placeholder={searchPlaceholder}
      className="searchbar searchbar-location ion-no-padding"
      clearIcon="no-icon"
      showCancelButton="always"
      cancelButtonIcon={closeSharp}
      onIonChange={e => this.onSearch(e.detail.value || '')}
      onIonCancel={this.onIonCancel}
    />
  )

  render() {
    const { results, searchShown } = this.state

    return (
      <IonPage>
        <Header title={title} actions={this.toolbarActions(searchShown)} />
        <IonContent>
          <MapContainer
            setLocation={this.setLocation}
            onMapApiLoaded={this.onMapApiLoaded}
          />
          <IonButton
            onClick={this.onPrimaryAction}
            className="ion-margin ion-action-primary"
            style={actionButtonStyle}
          >
            {primaryAction}
          </IonButton>
          <div
            style={{
              ...searchResultsDivStyle,
              visibility: results.length ? 'visible' : 'hidden',
            }}
          >
            <IonList lines="none" className="ion-no-padding">
              {results.map((result, i) => (
                <IonItem
                  key={i}
                  onClick={() => this.onPlacesResultClick(result)}
                  button
                >
                  {result.name}
                </IonItem>
              ))}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    )
  }

  componentDidUpdate() {
    if (this.searchRef) this.searchRef.setFocus()
  }
}

export default Component
