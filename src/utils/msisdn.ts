import { CallNumber } from '@ionic-native/call-number'

export function getMSISDNFromCCAndSN(cc: string, sn: string) {
  return `${cc}${sn}`
}

export function parseMTNUGSN(sn: string) {
  if (
    /^(77|78)/.test(sn) && // Regex accepts text starting with 77 or 78
    /^[0-9]{9}$/.test(sn) // Regex accepts text, length 9 containing only numbers
  )
    return sn
  throw new Error('Subscriber number not valid')
}

export function parseUGSN(sn: string) {
  if (
    /^(70|71|72|73|74|75|76|77|78|79)/.test(sn) && // Regex accepts text starting with 77 or 78
    /^[0-9]{9}$/.test(sn) // Regex accepts text, length 9 containing only numbers
  )
    return sn
  console.error('Subscriber number not valid') // eslint-disable-line no-console
}

export function formatUGMSISDN(msisdn: string) {
  const cc = CCs.ug.value
  if (msisdn.startsWith(cc)) {
    return `+${msisdn.slice(0, cc.length)} ${msisdn.slice(
      cc.length,
      6
    )} ${msisdn.slice(6)}`
  } else if (msisdn.startsWith('+' + cc)) {
    return `${msisdn.slice(0, cc.length + 1)} ${msisdn.slice(
      cc.length + 1,
      8
    )} ${msisdn.slice(8)}`
  } else if (msisdn.startsWith('0')) {
    return `${msisdn.slice(0, 4)} ${msisdn.slice(4)}`
  } else if (/^(77|78|70|75|71|79)/.test(msisdn)) {
    return `+${cc} ${msisdn.slice(0, 3)} ${msisdn.slice(3)}`
  }
  return msisdn
}

export const CCs = {
  ke: {
    label: '254',
    value: '254',
  },
  tz: {
    label: '255',
    value: '255',
  },
  ug: {
    label: '256',
    value: '256',
  },
}

export const mtnMSISDNStorageKey = 'mtn-msisdn'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callTelephone = async (number: string): Promise<any> => {
  return CallNumber.callNumber('+' + number, true)
}
