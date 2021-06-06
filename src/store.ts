import history from 'app-history'

import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from './reducers'

const initialState = {}
const enhancers = []

const middleware = [routerMiddleware(history)]
const Window: Window | any = window

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = Window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(rootReducer, initialState, composedEnhancers)
