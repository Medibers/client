import React from 'react'

import { Route, Switch } from 'react-router'

import {
  ADD_SUPPLIER_ITEM_URL,
  ADD_SUPPLIER_URL,
  SUPPLIER_URL,
  UPDATE_SUPPLIER_ITEM_URL,
  UPDATE_SUPPLIER_URL,
} from 'routes'

import Suppliers from './Suppliers/Suppliers'
import Supplier from './Supplier/Supplier'
import AddSupplier from './SupplierForm/AddSupplier'
import UpdateSupplier from './SupplierForm/UpdateSupplier'
import AddSupplierItem from './SupplierItemForm/AddSupplierItem'
import UpdateSupplierItem from './SupplierItemForm/UpdateSupplierItem'

const RootSuppliersView: React.FC = () => (
  <Switch>
    <Route path={ADD_SUPPLIER_ITEM_URL} component={AddSupplierItem} />
    <Route path={UPDATE_SUPPLIER_ITEM_URL} component={UpdateSupplierItem} />
    <Route exact path={ADD_SUPPLIER_URL} component={AddSupplier} />
    <Route path={UPDATE_SUPPLIER_URL} component={UpdateSupplier} />
    <Route path={SUPPLIER_URL} component={Supplier} />
    <Route render={() => <Suppliers />} />
  </Switch>
)

export default RootSuppliersView
