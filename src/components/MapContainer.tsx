import React, { useEffect } from 'react'

import { IonIcon } from '@ionic/react'
import { locationSharp as locationIcon } from 'ionicons/icons'

import { CentralLocation } from 'location'
import { getLastAttemptedDeliveryLocation, getSessionLocation } from 'session'

import { Location as LocationInterface } from 'types'
import { ILocationPoint } from 'location/types'

interface IMapContainerProps {
  setLocation?: (location: LocationInterface) => void
  mapCenter?: { lat: number; lon: number }
  onMapApiLoaded?: (a1: google.maps.Map) => void
  containerId?: string
}

const markerStyle = {
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: 'calc(50% - 15px)',
  left: 'calc(50% - 15px)',
}

const Component: React.FC<IMapContainerProps> = ({
  mapCenter: passedMapCenter,
  setLocation,
  onMapApiLoaded,
  containerId = 'map',
}) => {
  const mapCenter =
    passedMapCenter ||
    getLastAttemptedDeliveryLocation() ||
    getSessionLocation() ||
    CentralLocation

  const mapDefaults = {
    center: {
      lat: mapCenter.lat,
      lng: mapCenter.lon,
    },
    zoom: 12,
  }

  const onChange = ({ lat, lng: lon }: ILocationPoint) => {
    setLocation && setLocation({ lat, lon })
  }

  useEffect(() => {
    if (window.google) {
      const map = new google.maps.Map(
        document.getElementById(containerId) as HTMLElement,
        {
          center: mapDefaults.center,
          zoom: mapDefaults.zoom,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          draggable: Boolean(passedMapCenter) === false,
        }
      )
      map.addListener('center_changed', () => {
        const { lat, lng } = map.getCenter()
        onChange({ lat: lat(), lng: lng() })
      })
      onMapApiLoaded && onMapApiLoaded(map)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return window.google ? (
    <React.Fragment>
      <div id={containerId} style={{ height: '100%', width: '100%' }} />
      {
        <IonIcon
          className="ion-icon-secondary"
          style={markerStyle}
          icon={locationIcon}
        />
      }
    </React.Fragment>
  ) : null
}

// const Marker: React.FC<{ lat: number, lng: number }> = ({ lat, lng }) => (
//   <IonIcon className="ion-icon-secondary" icon={locationIcon} style={markerStyle} />
// )

export default Component
