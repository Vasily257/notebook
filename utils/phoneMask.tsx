/** Маска телефонного номера */
const matrix = '+7(___)___-__-__';

/** Обработать ввод для телефонного поля */
export function handleTelInput(event: Event) {
  /** Элемент поля ввода */
  const inputElement = event.target as HTMLInputElement;

  /** Строка с минимальным разрешенным количеством чисел */
  const minNumbers = matrix.replace(/\D/g, '');

  /** Строка с числами */
  let numberValues = inputElement.value.replace(/\D/g, '');

  /** Количество использованных чисел из numberValues */
  let numberCounter = 0;

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

  // Сопоставить и заменить текст
  inputElement.value = matrix.replace(/./g, replacer);
}

/** Обработать фокусировку для телефонного поля */
export function handleTelFocusIn(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.value === '') {
    inputElement.value = '+7(___)___-__-__';

    setTimeout(() => {
      inputElement.selectionStart = inputElement.selectionEnd = 3;
    });
  }
}

/** Обработать потерю фокуса для телефонного поля */
export function handleTelFocusOut(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.value === matrix || inputElement.value === '+7') {
    inputElement.value = '';
  }
}
