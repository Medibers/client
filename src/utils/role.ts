import decrypt from 'utils/jwt'
import { getSessionToken } from 'session'

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
export function userIsClientUser() {
  const roles = getUserRoles()
  return roles.length === 1 && roles.includes(1)
}

/**
 * User has privileges other than 'Client'
 *
 */
export function userIsNotClientUser() {
  return userIsAdmin() || userIsCourier() || userIsPharmacyOperator()
}

/**
 * User has Courier privileges
 *
 */
export function userIsCourier() {
  return getUserRoles().includes(2)
}

/**
 * User has Pharmacy-Operator privileges
 *
 */
export function userIsPharmacyOperator() {
  return getUserRoles().includes(3)
}

/**
 * User has Station-Administrator privileges
 *
 */
export function userIsAdmin() {
  return getUserRoles().includes(4)
}
