/**
 * Уменьшить частоту выполнения функции
 * @param throttledFunction функция, которую нужно реже выполнять (обязательное)
 * @param timeout интервал вызовов функции в мс (обязательное)
 */
export default function throttle(throttledFunction: (...args: unknown[]) => void, timeout: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function perform(...args: unknown[]) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      throttledFunction(...args);

      clearTimeout(timer!);

      timer = null;
    }, timeout);
  };
}
