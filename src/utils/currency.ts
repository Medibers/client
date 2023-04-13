/*
 * Note - Function fails with big ints
 * Though those are unnecessary for our cases
 * */
function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export const formatMoney = (amount: number, currency = 'UGX') => {
  return `${currency} ${numberWithCommas(amount)}`
}
