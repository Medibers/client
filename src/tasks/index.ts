import { App } from '@capacitor/app'
import { Network } from '@capacitor/network'
import { PushNotifications } from '@capacitor/push-notifications'
import { BackButtonEvent } from '@ionic/core'

import { platformIsAndroid, platformIsMobile } from 'utils'

import Routes from 'routes'
import Requests, { endPoints } from 'requests'
import eventsInstance, { syncData } from '../events'

platformIsMobile &&
  (function () {
    setPushNotificationListener()
    setNetworkListener()
    setBackButtonListener()
  })()

// Request permission to use push notifications
// iOS prompts user and return if they granted permission or not
// Android grants without prompting
function setPushNotificationListener() {
  PushNotifications.checkPermissions()
    .then(status => {
      switch (status.receive) {
        case 'denied':
        case 'granted':
          return Promise.resolve(status)
        default:
          return PushNotifications.requestPermissions()
      }
    })
    .then(status => {
      switch (status.receive) {
        case 'granted':
          return Promise.resolve(status)
        default:
          throw new Error('Push Notification permission denied')
      }
    })
    .then(() =>
      Promise.all([
        PushNotifications.addListener('registration', ({ value }) =>
          sendPushNotificationTokenToServer(value)
        ),
        PushNotifications.addListener(
          'registrationError',
          () => console.error('Push Notification registration failed') // eslint-disable-line no-console
        ),
      ])
    )
    .then(() =>
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register()
    )
    .catch(
      error => console.error(error) // eslint-disable-line no-console
    )
}

function sendPushNotificationTokenToServer(token: string) {
  Requests.put(endPoints['push-notification-token'], {
    platform: platformIsAndroid ? 'android' : 'ios',
    token,
  })
}

function setNetworkListener() {
  Network.removeAllListeners()
  // Attempt to run callback once when the network listener fires multiple times
  let i = 0,
    previousConnectionType: unknown = null
  Network.addListener(
    'networkStatusChange',
    ({ connected, connectionType }) => {
      if (previousConnectionType !== connectionType) i = 0
      if (connected) {
        i === 0 && eventsInstance.emit(syncData) // Trigger active page to sync data
        previousConnectionType = connectionType
        i++
      } else {
        i = 0
      }
    }
  )
}

const deadPaths = [Routes.login.path, Routes.home.path]

function setBackButtonListener() {
  // @ts-ignore
  document.addEventListener('ionBackButton', (event: BackButtonEvent) => {
    event.detail.register(-1, () => {
      const path = window.location.pathname
      if (deadPaths.includes(path)) App.exitApp()
    })
  })
}
