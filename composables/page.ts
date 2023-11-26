/** Хук для управления страницами */
export default function usePage() {
  /** Настройки текущего маршрута */
  const route = useRoute();

  /** ID контакта из query-запроса */
  const queryContactId = computed(() => {
    return String(route.query.contactId) || '';
  });

  /** Открыта ли домашняя страница */
  const isHomePage = computed(() => route.path === '/');

  /** Открыта ли страница редактирования контакта */
  const isEditPage = computed(() => route.path === '/edit');

  /** Открыта ли страница добавления нового контакта */
  const isNewPage = computed(() => route.path === '/new');

  /** Перейти на домашнюю страницу */
  const goToHomePage = async () => {
    await navigateTo('/');
  };

  /** Перейти на страницу создания нового контакта */
  const goToNewPage = async () => {
    await navigateTo('/new');
  };

  return {
    queryContactId,
    isHomePage,
    isEditPage,
    isNewPage,
    goToHomePage,
    goToNewPage,
  };
}
