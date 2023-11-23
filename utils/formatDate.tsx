import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/** Дата в полноценном формате */
const FULL_DATE_FORMAT = 'DD.MM.YY HH:MM:SS';

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
