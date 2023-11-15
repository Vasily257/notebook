import { computed } from 'vue';

/** Хук для управления страницами */
export default function usePage() {
  /** Настройки роутинга */
  const route = useRoute();

  /** Открыта ли домашняя страница */
  const isHomePage = computed(() => route.path === '/');

  /** Открыта ли страница редактирования контакта */
  const isEditContactPage = computed(() => route.path === '/edit');

  /** Открыта ли страница добавления нового контакта */
  const isNewContact = computed(() => route.path === '/new');
  

  return {
    isHomePage,
    isEditContactPage,
    isNewContact,
  };
}
