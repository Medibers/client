/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars, no-undef, no-restricted-globals */

function platformIsWeb() {
  return location.host !== 'localhost' // TODO: Re-think this
}

function platformIsLocal() {
  return location.host === 'localhost:3000' // TODO: Re-think this
}

async function readJSONFile(filePath) {
  const response = await fetch(filePath)
  return JSON.parse(await response.text())
}

async function initializeFCM() {
  const { 'fb-configuration': configuration, 'fcm-vapid-key': vapidKey } =
    await readJSONFile('/static/vars.json')

  firebase.initializeApp(configuration)

  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(vapidKey)

  return messaging
}

async function retrieveFCMToken(fcm) {
  let token = null
  try {
    token = await fcm.getToken()
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }
  return token
}

// TODO: Find a better way to handle this, probably webpack proxy
const getApiUrl = () => {
  switch (location.host) {
    case 'app.medibers.com':
      return `https://api.medibers.com`
    default:
      return `https://dev.api.medibers.com`
  }
}

async function sendFCMTokenToServer(token) {
  const {
    'local-server-url': localUrl,
    'server-auth-token-key': key,
    'push-notification-token-send-state-key': pushNotificationTokenSendStateKey,
  } = await readJSONFile('/static/vars.json')

  const url = platformIsLocal() ? localUrl : getApiUrl()
  const sessionAvailable = localStorage.getItem(key) !== undefined
  const pushNotificationTokenNotSent =
    localStorage.getItem(pushNotificationTokenSendStateKey) === null ||
    localStorage.getItem(pushNotificationTokenSendStateKey) === '0'

  let result = null
  if (sessionAvailable && pushNotificationTokenNotSent) {
    const { data } = await axios({
      url: url + '/api/push-notification-token',
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(key),
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ platform: 'web', token }),
    })
    result = data.result
    localStorage.setItem(pushNotificationTokenSendStateKey, '1')
  }

  return result
}
