importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js'
)

let event = null

// TODO: Find a better way to handle this, probably webpack proxy
const getApiUrl = () => {
  switch (location.host) {
    case 'dev.app.medibers.com':
      return `https://dev.api.medibers.com`
    default:
      return location.port === '3000'
        ? 'http://localhost:3015'
        : 'https://api.medibers.com' // For mobile and https://app.medibers.com
  }
}

const onSocketEvent = message => {
  console.info('Message received from server', message) // eslint-disable-line no-console
  postMessage(message)
}

onmessage = function ({ data }) {
  // eslint-disable-next-line no-console
  console.info(
    (data.token ? 'Session token' : 'Message') + ' received from main script',
    data.token ? '.. setting up socket io' : ''
  )

  if (data.token) {
    const socket = io(getApiUrl(), { query: `token=${data.token}` })
    socket.on(data.token, onSocketEvent)
    event = data.token
    return
  }

  if (event == null) return

  // Do other stuff here
}
