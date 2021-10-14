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
    isForAdmins: true,
  },
  supplier: {
    path: '/supplier',
    component: Supplier,
    isForAdmins: true,
  },
  'supplier-add': {
    path: '/suppliers/add',
    component: AddSupplier,
    isForAdmins: true,
  },
  'supplier-update': {
    path: '/suppliers/update',
    component: UpdateSupplier,
    isForAdmins: true,
  },
  'supplier-item-add': {
    path: '/suppliers/items/add',
    component: AddSupplierItem,
    isForAdmins: true,
  },
  'supplier-item-update': {
    path: '/suppliers/items/update',
    component: UpdateSupplierItem,
    isForAdmins: true,
  },
}

export default routes
