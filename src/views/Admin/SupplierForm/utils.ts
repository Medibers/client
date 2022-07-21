import { ISupplier } from 'views/Admin/types'
import { ISupplierFormFields } from './types'

export const getItemFormDefaultValues = (
  supplier?: ISupplier
): ISupplierFormFields => {
  if (supplier) {
    return {
      name: supplier.name,
      phones: supplier.phones || [],
      email: supplier.email || null,
      lat: supplier.lat || null,
      lon: supplier.lon || null,
      address: supplier.address,
    }
  }

  return {
    name: '',
    phones: [],
    email: null,
    lat: null,
    lon: null,
    address: '',
  }
}
