import { LocationState, createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default history

export const navigateTo = (path: string, state?: LocationState): void => {
  history.push(path, {
    ...(history.location.state as Record<string, unknown>),
    ...(state as Record<string, unknown>),
  })
}

export const redirectTo = (path: string, state?: LocationState): void => {
  history.replace(path, {
    ...(history.location.state as Record<string, unknown>),
    ...(state as Record<string, unknown>),
  })
}

export const goBack = (): void => {
  history.goBack()
}

export const getLocationPath = (): string => history.location.pathname

export const getLocationState = (): LocationState =>
  history.location.state as Record<string, unknown>
