import { LocationState, createBrowserHistory } from 'history'
import { useRouteMatch } from 'react-router'

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

export const getLocationState = <T = LocationState>(): T =>
  (history.location.state || {}) as T

export const getLocationQueryParameter = (key: string): string | null => {
  const { search } = window.location
  return new URLSearchParams(search).get(key)
}

export const useGetRouteParams = <
  // eslint-disable-next-line no-unused-vars
  T extends { [K in keyof T]?: string | undefined }
>(
  url: string
): T => {
  const match = useRouteMatch<T>(url)
  return match ? match.params : ({} as T)
}
