import { onMounted, onBeforeUnmount } from 'vue';
import throttle from '~/utils/throttle';

/** Хук для управления шириной экрана */
export default function useScreenWidth() {
  /** Значения брейкпоинтов */
  const breakpoints = {
    small: 450,
    medium: 600,
    large: 900,
    extraLarge: 1200,
  };

  /** Функция, которая реже вызывает обработчик изменения экрана */
  let throttledHandleResize = () => {};

  const isExtraSmall = ref(true);
  const isSmall = ref(false);
  const isMedium = ref(false);
  const isLarge = ref(false);
  const isExtraLarge = ref(false);

  /** Обработать изменение экрана */
  const handleResize = () => {
    const width = window.innerWidth;

    isSmall.value = width >= breakpoints.small;
    isMedium.value = width >= breakpoints.medium;
    isLarge.value = width >= breakpoints.large;
    isExtraLarge.value = width >= breakpoints.extraLarge;
  };

  throttledHandleResize = throttle(handleResize, 150);

  onMounted(() => {
    window.addEventListener('resize', throttledHandleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', throttledHandleResize);
  });

  return {
    isExtraSmall,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
  };
}
