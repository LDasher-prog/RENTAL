export const currency = (value: number) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value)

export const localDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const compactNumber = (value: number) =>
  new Intl.NumberFormat('en-KE', { compactDisplay: 'short', notation: 'compact' }).format(value)
