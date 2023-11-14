import { ref } from 'vue';

/** Хук для управления шапкой сайта */
export default function useHeader() {
  /** Открыта ли домашняя страница */
  const isHomePage = ref(true);

  /** Текст внутри шапки сайта */
  const headerText = ref('Книга контактов');

  /** Настройки основной иконки */
  const mainIcon = ref({
    isVisible: true,
    name: 'contacts',
    width: 31,
    height: 24,
  });

  /** Настройки роутинга */
  const route = useRoute();

  if (route.path !== '/') {
    isHomePage.value = false;
  }

  if (route.path === '/edit') {
    headerText.value = 'Двери Вадим' || 'Без имени';
    mainIcon.value.isVisible = false;
  }

  if (route.path === '/new') {
    headerText.value = 'Новый контакт';
    mainIcon.value.name = 'new-user';
    mainIcon.value.width = 16;
    mainIcon.value.height = 16;
  }

  return {
    isHomePage,
    headerText,
    mainIcon,
  };
}
