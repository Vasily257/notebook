import { ref } from 'vue';

/** Хук для управлени шапкой сайта */
export default function useHeader() {
  /** Показана ли кнопка "Закрыть" */
  const isCloseShown = ref(true);

  /** Настройки роутинга */
  const route = useRoute();

  /** Настройки основной иконки */
  const mainIcon = computed(() => {
    const mainIcon = {
      name: 'contacts',
      width: 31,
      height: 24,
    };

    return mainIcon;
  });

  onMounted(() => {
    if (route.path === '/') {
      isCloseShown.value = false;
    }
  });

  return {
    isCloseShown,
    mainIcon,
  };
}
