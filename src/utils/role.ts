/* eslint-disable no-unused-vars */

import decrypt from 'utils/jwt'
import { getSessionToken } from 'session'

enum ERoles {
  User = 1,
  Courier = 2,
  Pharmacy_Operator = 3,
  Station_Administrator = 4,
}

export function getUserRoles(): number[] {
  try {
    /**
     * Support role structure "{ role: 1 }" on old clients
     *
     * */
    const { role, roles } = decrypt(getSessionToken())

    return [role || roles].flat() as number[]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return []
  }
}

/**
 * User has solely Client privileges
 *
 */
export const userIsClientUser = (roles = getUserRoles()) =>
  roles.length === 1 && roles.includes(ERoles.User)

/**
 * User has privileges other than 'Client'
 *
 */
export const userIsNotClientUser = (roles = getUserRoles()) =>
  userIsAdmin(roles) || userIsCourier(roles) || userIsPharmacyOperator(roles)

/**
 * User has Courier privileges
 *
 */
export const userIsCourier = (roles = getUserRoles()) =>
  roles.includes(ERoles.Courier)

/**
 * User has Pharmacy-Operator privileges
 *
 */
export const userIsPharmacyOperator = (roles = getUserRoles()) =>
  roles.includes(ERoles.Pharmacy_Operator)

/**
 * User has Station-Administrator privileges
 *
 */
export const userIsAdmin = (roles = getUserRoles()) =>
  roles.includes(ERoles.Station_Administrator)
