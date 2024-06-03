export function currencyFormat(value: number) {
  if (value == undefined) {
    return '';
  }
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' })
    .format(value);
}
