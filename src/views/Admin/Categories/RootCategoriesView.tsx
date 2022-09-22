import React from 'react'

import { Route, Switch } from 'react-router'

import { ADD_CATEGORY_URL, CATEGORY_URL } from 'routes'

import Categories from './Categories'
import AddCategory from './AddCategory'
import UpdateCategory from './UpdateCategory'

const RootCategoriesView: React.FC = () => (
  <Switch>
    <Route exact path={ADD_CATEGORY_URL} component={AddCategory} />
    <Route exact path={CATEGORY_URL} component={UpdateCategory} />
    <Route render={() => <Categories />} />
  </Switch>
)

export default RootCategoriesView
