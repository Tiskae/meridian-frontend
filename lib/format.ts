const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(
  amount: number | undefined,
  currency: string = 'NGN',
): string {
  if (!amount) return 'Price on request';
  if (currency === 'USD') return USD.format(amount);
  return NGN.format(amount);
}

export function formatMileage(
  value: number | undefined,
  unit: string = 'km',
): string {
  if (value === undefined || value === null) return '—';
  return `${value.toLocaleString('en-NG')} ${unit}`;
}

export function formatStockNumber(id: string): string {
  const short = id.slice(-4).toUpperCase();
  return `MM-${short}`;
}
