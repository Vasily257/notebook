import { onMounted, onBeforeUnmount } from 'vue';
import throttle from '~/utils/throttle';

/** Хук для управления шириной экрана */
export default function useScreenWidth() {
  /** Значения брейкпоинтов */
  const breakpoints = {
    extraSmall: 376,
    small: 576,
    medium: 768,
    large: 992,
    extraLarge: 1200,
    extraExtraLarge: 1920,
  };

  /** Функция, которая реже вызывает обработчик изменения экрана */
  let throttledHandleResize = () => {};

  const isExtraExtraSmall = ref(true);
  const isExtraSmall = ref(false);
  const isSmall = ref(false);
  const isMedium = ref(false);
  const isLarge = ref(false);
  const isExtraLarge = ref(false);
  const isExtraExtraLarge = ref(false);

  /** Обработать изменение экрана */
  const handleResize = () => {
    const width = window.innerWidth;

    isExtraSmall.value = width >= breakpoints.extraSmall;
    isSmall.value = width >= breakpoints.small;
    isMedium.value = width >= breakpoints.medium;
    isLarge.value = width >= breakpoints.large;
    isExtraLarge.value = width >= breakpoints.extraLarge;
    isExtraExtraLarge.value = width >= breakpoints.extraExtraLarge;
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
    /** Меньше 376px */
    isExtraExtraSmall,
    /** 376px и шире */
    isExtraSmall,
    /** 576px и шире */
    isSmall,
    /** 768px и шире */
    isMedium,
    /** 992px и шире */
    isLarge,
    /** 1200px и шире */
    isExtraLarge,
    /** 1920px и шире */
    isExtraExtraLarge,
  };
}
