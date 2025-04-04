import moment from 'moment'
import 'moment/dist/locale/fr'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getCurrentTimestamp(): number {
  return Math.round(Number(new Date()) / 1000)
}

export function getDateFromTimestamp(
  date: number,
  {
    locale = 'en',
    pattern = 'MM/DD/YYYY HH:mm',
  }: { locale?: string; pattern?: string } = {}
) {
  return moment(new Date(date * 1000))
    .locale(locale)
    .format(pattern)
}

export function reformatDate(
  date: string | Date,
  { inPattern = 'YYYY-MM-DD', outPattern = 'DD MMM YYYY', locale = 'fr' } = {}
) {
  return date ? moment(date, inPattern).locale(locale).format(outPattern) : ''
}

export function formatDate(
  date: string | Date,
  { outPattern = 'DD MMM YYYY', locale = 'fr' } = {}
) {
  return date ? moment(date).locale(locale).format(outPattern) : ''
}

export function differenceWithToday(
  date: string | Date,
  {
    pattern = 'YYYY-MM-DD',
    unit = 'days',
  }: { pattern?: string; unit?: moment.unitOfTime.Diff } = {}
): number {
  return moment(date, pattern).diff(moment(), unit)
}

export function differenceBetweenDates(
  startDate: string | Date,
  endDate: string | Date,
  {
    startDatePattern = 'YYYY-MM-DD',
    endDatePattern = 'YYYY-MM-DD',
    unit = 'days',
  }: {
    startDatePattern?: string
    endDatePattern?: string
    unit?: moment.unitOfTime.Diff
  } = {}
) {
  const start = moment(startDate, startDatePattern)
  const end = moment(endDate, endDatePattern)

  return start.diff(end, unit)
}

export function differenceFromNow(
  date: string | Date,
  { locale = 'en', pattern = 'YYYY-MM-DD HH:mm:ss' } = {}
) {
  return moment(date, pattern).locale(locale).fromNow()
}
