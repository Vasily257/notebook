import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/** Дата в полном формате */
const FULL_DATE_FORMAT = 'DD.MM.YY HH:mm:ss';

/** Дата в укороченном формате (без времени) */
const SHORT_DATE_FORMAT = 'DD.MM.YY';

/**
 * Убрать время из даты
 * @param input дата в формате ДД.ММ.ГГ ЧЧ:ММ:CC
 * @returns дата в формате ДД.ММ.ГГ
 */
export function removeTime(input: dayjs.ConfigType): string {
  return dayjs(input, FULL_DATE_FORMAT).locale('ru').format(SHORT_DATE_FORMAT);
}

/**
 * Получить текущую дату
 * @returns дата в формате ДД.ММ.ГГ ЧЧ:ММ:CC
 */
export function getNow(): string {
  return dayjs().locale('ru').format(FULL_DATE_FORMAT);
}

/**
 * Сравнить две даты
 * @param dateA первая сравнивания дата
 * @param dateB вторая сравнивания дата
 * @returns число для коллбэка функции sort() (0, -1 или 1)
 */
export function compareDates(dateA: dayjs.ConfigType, dateB: dayjs.ConfigType): number {
  let result = 0;

  const formattedDateA = dayjs(dateA, FULL_DATE_FORMAT);
  const formattedDateB = dayjs(dateB, FULL_DATE_FORMAT);

  if (formattedDateA.isAfter(formattedDateB)) {
    result = 1;
  } else if (formattedDateA.isBefore(formattedDateB)) {
    result = -1;
  }

  return result;
}
