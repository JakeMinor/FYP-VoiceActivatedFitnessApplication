import dayjs from 'dayjs'

/**
 * Formats a date.
 * @param date - The date string.
 */
export function formatDate(date) {
 return dayjs(date).format('ddd D MMM YYYY @ H:mm')
}
