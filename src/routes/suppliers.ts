import {
  AddSupplier,
  AddSupplierItem,
  Supplier,
  Suppliers,
  UpdateSupplier,
  UpdateSupplierItem,
} from 'views/pages'

import { TRoutes } from './types'

const routes: TRoutes = {
  suppliers: {
    path: '/suppliers',
    component: Suppliers,
  },
  supplier: {
    path: '/supplier',
    component: Supplier,
  },
  'supplier-add': {
    path: '/suppliers/add',
    component: AddSupplier,
  },
  'supplier-update': {
    path: '/suppliers/update',
    component: UpdateSupplier,
  },
  'supplier-item-add': {
    path: '/suppliers/items/add',
    component: AddSupplierItem,
  },
  'supplier-item-update': {
    path: '/suppliers/items/update',
    component: UpdateSupplierItem,
  },
}

export default routes
