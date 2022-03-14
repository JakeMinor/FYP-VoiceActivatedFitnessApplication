import dayjs from 'dayjs'

/**
 * Formats a date.
 * @param date - The date string.
 */
export function formatDate(date) {
 return dayjs(date).format('ddd D MMM YYYY @ H:mm')
}

export function throwToast(message) {
 this.$bvToast.toast(message, {
  title: 'Error',
  variant: 'danger',
  solid: true
 })
}