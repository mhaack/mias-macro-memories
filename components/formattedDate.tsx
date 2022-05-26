import { DateTime } from 'luxon'

type Props = {
  isoString: string
}

function FormattedDate({ isoString }: Props) {
  return (
    <time dateTime="{isoString}">
      {DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_FULL, { locale: 'en-gb' })}
    </time>
  )
}

export default FormattedDate
