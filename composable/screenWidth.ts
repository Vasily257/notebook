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
  const isSmallAndWider = ref(false);
  const isMediumAndWider = ref(false);
  const isLargeAndWider = ref(false);
  const isExtraLargeAndWider = ref(false);

  /** Обработать изменение экрана */
  const handleResize = () => {
    const width = window.innerWidth;

    isSmallAndWider.value = width >= breakpoints.small;
    isMediumAndWider.value = width >= breakpoints.medium;
    isLargeAndWider.value = width >= breakpoints.large;
    isExtraLargeAndWider.value = width >= breakpoints.extraLarge;
  };

  throttledHandleResize = throttle(handleResize, 150);

  onMounted(() => {
    handleResize();

    window.addEventListener('resize', throttledHandleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', throttledHandleResize);
  });

  return {
    /** Меньше Small ширины */
    isExtraSmall,
    /** Small ширина и шире */
    isSmallAndWider,
    /** Medium ширина и шире */
    isMediumAndWider,
    /** Large ширина и шире */
    isLargeAndWider,
    /** Extra Large ширина и шире */
    isExtraLargeAndWider,
  };
}
