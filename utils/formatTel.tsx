import { PHONE_MASK } from '~/constants';

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

/**
 * Получить номер телефона, используя заданную маску
 * @param value текст, введенный в поле
 * @returns телефон в формате +7(123)456-78-90
 */
export function getTelUsingMask(value: string): string {
  /** Строка с числами */
  let numberValues = value.replace(/\D/g, '');

  /** Количество использованных чисел из numberValues */
  let numberCounter = 0;

  /** Строка с минимальным разрешенным количеством чисел */
  const minNumbers = PHONE_MASK.replace(/\D/g, '');

  // Обработать вариант, когда пользователь ввел слишком короткий номер
  if (minNumbers.length >= numberValues.length) numberValues = minNumbers;

  /** Заменить символы в строке matrix в соответствии с введенными цифрами */
  const replacer = (match: string) => {
    if (/[0-9_]/.test(match) && numberCounter < numberValues.length) {
      // Если символ является числом или нижнем подчеркиванием и если ещё не все числа перебраны,
      // то увеличить счетчик и вернуть перебираемый символ из строки
      numberCounter += 1;

      return numberValues.charAt(numberCounter - 1);
    } else if (numberCounter >= numberValues.length) {
      // Если все цифры использованы, то не добавлять символы
      return '';
    } else {
      return match;
    }
  };

  // Вернуть обработанный текст
  return PHONE_MASK.replace(/./g, replacer);
}
