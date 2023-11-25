/**
 * Удалить все пробелы в начале и в конце строки,
 * а также оставить между словами только один пробел
 * @param input вводимое значение
 * @returns строка без лишних пробелов
 */
export function removeExtraSpaces(input: string): string {
  return input.trim().replace(/\s+/g, ' ') || '';
}
