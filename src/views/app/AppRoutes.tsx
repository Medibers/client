import React from 'react'

import { Route, Switch } from 'react-router'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import history from 'app-history'

import Routes, { getDefaultRoute } from 'routes'
import { sessionAvailable } from 'session'
import { userIsAdmin } from 'utils/role'

// Redirect to default home if session available
const handlePublicRoutes = (
  Component: Function,
  props: RouteComponentProps,
  redirectWhenSessionAvailable: boolean
) => {
  if (sessionAvailable() && redirectWhenSessionAvailable) {
    return <Redirect to={getDefaultRoute()} />
  }

  return <Component {...props} />
}

const userIsAuthorizedForProtectedRoute = (routeIsForAdmin: boolean) =>
  routeIsForAdmin ? userIsAdmin() : sessionAvailable()

const ignoredPaths = [Routes.login.path, Routes.account.path]

// Redirect to /login if session not available
const handleProtectedRoutes = (
  Component: Function,
  props: RouteComponentProps,
  isForAdmin: boolean
) => {
  const {
    location: { pathname, search, state },
  } = props

  const searchStr = ignoredPaths.includes(pathname)
    ? search
    : search + '?to=' + pathname

  return userIsAuthorizedForProtectedRoute(isForAdmin) ? (
    <Component {...props} />
  ) : (
    <Redirect
      to={{
        pathname: Routes.login.path,
        search: searchStr,
        state,
      }}
    />
  )
}

const routeValues = Object.values(Routes)

const AppRoutes: React.FC = () => {
  return (
    <IonReactRouter history={history}>
      <IonRouterOutlet>
        <Switch>
          {routeValues.map(
            (
              {
                path,
                component: Component,
                isPublic,
                isForAdmins = false,
                redirectWhenSessionAvailable = false,
              },
              i
            ) => (
              <Route
                exact
                key={i}
                path={path}
                render={props =>
                  isPublic
                    ? handlePublicRoutes(
                        Component,
                        props,
                        redirectWhenSessionAvailable
                      )
                    : handleProtectedRoutes(Component, props, isForAdmins)
                }
              />
            )
          )}
          {/* 404s */}
          <Route render={() => <Redirect to={Routes.home.path} />} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default AppRoutes
