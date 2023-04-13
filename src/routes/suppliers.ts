import {
  AddSupplier,
  AddSupplierItem,
  Supplier,
  Suppliers,
  UpdateSupplier,
  UpdateSupplierItem,
} from 'views'

import { TRoutes } from './types'

const routes: TRoutes = {
  suppliers: {
    path: '/suppliers',
    component: Suppliers,
    isPublic: true,
  },
  'supplier-add': {
    path: '/suppliers/add',
    component: AddSupplier,
    isForAdmins: true,
  },
  supplier: {
    path: '/suppliers/:id',
    getPath: (id: string) => `/suppliers/${id}`,
    component: Supplier,
    isPublic: true,
  },
  'supplier-update': {
    path: '/suppliers/:id/update',
    getPath: (id: string) => `/suppliers/${id}/update`,
    component: UpdateSupplier,
    isForAdmins: true,
  },
  'supplier-item-add': {
    path: '/suppliers/items/add',
    component: AddSupplierItem,
    isForAdmins: true,
  },
  'supplier-item-update': {
    path: '/suppliers/:supplierId/items/:supplierItemId/update',
    getPath: (supplierId: string, supplierItemId?: string) =>
      `/suppliers/${supplierId}/items/${supplierItemId}/update`,
    component: UpdateSupplierItem,
    isForAdmins: true,
  },
}

export default routes
