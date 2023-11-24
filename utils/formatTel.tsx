/**
 * Получить номер телефона в полной форме
 * @param tel 11-значный номер телефона c «7» в начале
 * @returns телефон в формате +7(123)456-78-90
 */
export function getFullTel(tel: string): string {
  let result = '';

  if (tel?.length === 11) {
    const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11] = tel;

    result = `+${d1}(${d2}${d3}${d4})${d5}${d6}${d7}-${d8}${d9}-${d10}${d11}`;
  }

  return result;
}

/**
 * Получить номер телефона в короткой форме
 * @param tel 16-значный номер телефона
 * @returns телефон в формате 71234567890
 */
export function getShortTel(tel: string): string {
  let result = '';

  if (tel?.length === 16) {
    result = tel.replace(/[()+-]/g, '');
  }

  return result;
}
