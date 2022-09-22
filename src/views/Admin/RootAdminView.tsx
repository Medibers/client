import React from 'react'

import { Route, Switch } from 'react-router'

import { userIsAdmin } from 'utils/role'
import { NotAuthorized } from 'components'

import { CATEGORIES_URL, SUPPLIERS_URL } from 'routes'

import Dashboard from './Dashboard'
import RootCategoriesView from './Categories'
import RootSuppliersView from './RootSuppliersView'

export const RootAdminView: React.FC = () =>
  userIsAdmin() ? (
    <Switch>
      <Route path={SUPPLIERS_URL} component={RootSuppliersView} />
      <Route path={CATEGORIES_URL} component={RootCategoriesView} />
      <Route render={() => <Dashboard />} />
    </Switch>
  ) : (
    <NotAuthorized />
  )

export default RootAdminView
