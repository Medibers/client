import { LocationState, createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default history

export const navigateTo = (path: string, state?: LocationState): void => {
  history.push(path, state)
}

export const redirectTo = (path: string, state?: LocationState): void => {
  history.replace(path, state)
}

export const getLocationPath = (): string => history.location.pathname
