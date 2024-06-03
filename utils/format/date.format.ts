import dayjs from 'dayjs';

export function dateFormat(value: string, format = 'MM/DD/YYYY') {
  const date = dayjs(value);
  if (date.isValid()) {
    return date.format(format);
  }

  return '';
}
