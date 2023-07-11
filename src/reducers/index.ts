import { combineReducers } from 'redux'
import { Action } from 'types'

import App, { State as AppState } from './app'

export interface State {
  App: AppState
}

const fn = (state: State | undefined, action: Action) =>
  combineReducers({
    App,
  })(state, action)

export default fn
