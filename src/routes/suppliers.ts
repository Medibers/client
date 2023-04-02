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
    path: '/admin/suppliers/add',
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
    path: '/admin/suppliers/:id/update',
    getPath: (id: string) => `/admin/suppliers/${id}/update`,
    component: UpdateSupplier,
    isForAdmins: true,
  },
  'supplier-item-add': {
    path: '/admin/suppliers/items/add',
    component: AddSupplierItem,
    isForAdmins: true,
  },
  'supplier-item-update': {
    path: '/admin/suppliers/:supplierId/items/:supplierItemId/update',
    getPath: (supplierId: string, supplierItemId?: string) =>
      `/admin/suppliers/${supplierId}/items/${supplierItemId}/update`,
    component: UpdateSupplierItem,
    isForAdmins: true,
  },
}

export default routes
