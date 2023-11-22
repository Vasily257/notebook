import { computed } from 'vue';

/** Хук для управления страницами */
export default function usePage() {
  /** Настройки роутинга */
  const route = useRoute();

  /** ID контакта из query-запроса */
  const queryContactId = (route.query.contactId as string) || '';

  /** Открыта ли домашняя страница */
  const isHomePage = computed(() => route.path === '/');

  /** Открыта ли страница редактирования контакта */
  const isEditContactPage = computed(() => route.path === '/edit');

  /** Открыта ли страница добавления нового контакта */
  const isNewContact = computed(() => route.path === '/new');

  return {
    queryContactId,
    isHomePage,
    isEditContactPage,
    isNewContact,
  };
}
