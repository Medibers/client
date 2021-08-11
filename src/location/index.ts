/* eslint-disable no-undef */

import {
  Geolocation,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation'

import {
  getLastAttemptedDeliveryLocation,
  getSessionLocation,
  setSessionLocation,
} from 'session'

import { platformIsWeb } from 'utils'
import { ILocationPoint } from './types'

export const updateCurrentPosition = async () => {
  const res = await Geolocation.getCurrentPosition()
  const { latitude: lat, longitude: lon, accuracy: acc } = res.coords
  const address = await queryAddress(lat, lon)
  const location = { lat, lon, acc, address }
  setSessionLocation(location)
  return location
}

export const watchPosition = () => {
  return Geolocation.watchPosition().subscribe(
    async (res: Geoposition | PositionError) => {
      const coordinates = (res as Geoposition).coords
      if (coordinates) {
        const { latitude: lat, longitude: lon, accuracy: acc } = coordinates
        const address = await queryAddress(lat, lon)
        setSessionLocation({ lat, lon, acc, address })
      } else {
        // handle PositionError
        console.error(res) // eslint-disable-line no-console
      }
    },
    console.error // eslint-disable-line no-console
  )
}

export const formatDistance = (mDistance: number) => {
  // mDistance -> meter distance
  if (mDistance < 50) return '< 50m'
  if (mDistance < 1000) return `${mDistance}m`
  if (mDistance < 50000) return `${mDistance / 1000}km`
  return '> 50km'
}

export const getMapKey: () => string = () =>
  (platformIsWeb
    ? process.env.REACT_APP_MAP_KEY_WEB
    : process.env.REACT_APP_MAP_KEY_MOBILE) || ''

export const CentralLocation = {
  lat: 0.3476,
  lon: 32.5825,
}

export const getDeliveryLocationForNextOrder = () =>
  getLastAttemptedDeliveryLocation() || getSessionLocation() || {}

export const getDeliveryAddressForNextOrder = (placeholder?: string) =>
  getDeliveryLocationForNextOrder().address || placeholder

export const queryAddress: (a1: number, a2: number) => Promise<string | null> =
  async (lat: number, lng: number) => {
    if (google === undefined) return null

    const geocoder: google.maps.Geocoder = new google.maps.Geocoder()

    const location = { lat, lng }

    return await new Promise(resolve => {
      geocoder.geocode({ location }, (results, status) => {
        console.debug('Geocoder query status', status, results) // eslint-disable-line no-console
        if (status !== 'OK') {
          resolve(null)
        } else if (results.length) {
          resolve(results[0].formatted_address)
        } else resolve(null)
      })
    })
  }

export const queryPlace = async (
  map: google.maps.Map | undefined,
  query: string
) => {
  if (query === null) return []
  if (query === '') return []
  if (map === undefined) return []

  return new Promise(resolve => {
    var request = {
      query,
      fields: ['name', 'geometry'],
    }

    var service = new google.maps.places.PlacesService(map)

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results)
      } else resolve([])
    })
  })
}

const BaseLocation: ILocationPoint = {
  lat: 0.32499999999999574,
  lng: 32.57500000000002,
}

export const computeDeliveryDistance: (
  map: google.maps.Map | undefined
) => Promise<number | null> = async map => {
  if (map === undefined) return null

  let directionsService = new google.maps.DirectionsService()
  let directionsRenderer = new google.maps.DirectionsRenderer()
  directionsRenderer.setMap(map)

  const { lat, lon } = getDeliveryLocationForNextOrder()

  const route = {
    origin: BaseLocation,
    destination: { lat, lng: lon },
    travelMode: google.maps.TravelMode.DRIVING,
  }

  return new Promise(resolve => {
    directionsService.route(
      route,
      (
        response: google.maps.DirectionsResult,
        status: google.maps.DirectionsStatus
      ) => {
        if (status !== 'OK') {
          console.error('Directions request, status', status) // eslint-disable-line no-console
          resolve(null)
          return
        }
        // directionsRenderer.setDirections(response) // Render route on map
        const data = response.routes[0].legs[0] // Get first of possible routes
        if (data) {
          const { value: distanceInMetres /* text */ } = data.distance
          resolve(distanceInMetres)
        } else {
          console.error('Directions data not returned', data) // eslint-disable-line no-console
          resolve(null)
        }
      }
    )
  })
}
