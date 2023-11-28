/**
 * Является ли элемент кнопкой
 * @param target проверяемый элемент
 */
export function isButton(target: Element) {
  return target instanceof HTMLButtonElement;
}

/**
 * Является ли элемент полем ввода
 * @param target проверяемый элемент
 */
export function isInput(target: Element) {
  return target instanceof HTMLInputElement;
}

/**
 * Является ли элемент полем ввода с типом «tel»
 * @param target проверяемый элемент
 */
export function isTelInput(target: Element) {
  return target instanceof HTMLInputElement && target.type === 'tel';
}
