import React from 'react'

import { Route } from 'react-router'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import history from 'app-history'

import Routes, { getDefaultRoute } from 'routes'
import { sessionAvailable } from 'session'

// Redirect to default home if session available
const handlePublicRoutes = (
  Component: Function,
  props: RouteComponentProps,
  preventRedirectWhenSessionAvailable = false
) =>
  sessionAvailable() && preventRedirectWhenSessionAvailable === false ? (
    <Redirect to={getDefaultRoute()} />
  ) : (
    <Component {...props} />
  )

// Redirect to /login if session not available
const handleProtectedRoutes = (
  Component: Function,
  props: RouteComponentProps
) =>
  sessionAvailable() ? (
    <Component {...props} />
  ) : (
    <Redirect to={Routes.login.path} />
  )

const routeValues = Object.values(Routes)

const AppRoutes: React.FC = () => {
  return (
    <IonReactRouter history={history}>
      <IonRouterOutlet>
        {routeValues.map(
          (
            {
              path,
              component: Component,
              isPublic,
              preventRedirectWhenSessionAvailable,
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
                      preventRedirectWhenSessionAvailable
                    )
                  : handleProtectedRoutes(Component, props)
              }
            />
          )
        )}
        {/* 404s */}
        <Route render={() => <Redirect to={Routes.home.path} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default AppRoutes
