import EventEmitter from 'events'

const emitter = new EventEmitter()

export default emitter

export const requestCreate = 'event-1'
export const requestUpdate = 'event-2'

export const syncData = 'sync-data'
