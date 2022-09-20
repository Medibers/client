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
    path: '/admin/suppliers',
    component: Suppliers,
    isForAdmins: true,
  },
  'supplier-add': {
    path: '/admin/suppliers/add',
    component: AddSupplier,
    isForAdmins: true,
  },
  supplier: {
    path: '/admin/suppliers/:id',
    getPath: (id: string) => `/admin/suppliers/${id}`,
    component: Supplier,
    isForAdmins: true,
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
