import { ref } from 'vue';
import usePage from './page';

/** Хук для управления шапкой сайта */
export default function useHeader() {
  const { isHomePage, isEditContactPage, isNewContact } = usePage();

  /** Текст внутри шапки сайта */
  const headerText = ref('Книга контактов');

  /** Настройки основной иконки */
  const mainIcon = ref({
    isVisible: true,
    name: 'contacts',
    width: 31,
    height: 24,
  });

  if (isEditContactPage.value) {
    headerText.value = 'Двери Вадим' || 'Без имени';
    mainIcon.value = {
      ...mainIcon.value,
      isVisible: false,
    };
  }

  if (isNewContact.value) {
    headerText.value = 'Добавить контакт';

    mainIcon.value = {
      ...mainIcon.value,
      name: 'new-user',
      width: 16,
      height: 16,
    };
  }

  return {
    isHomePage,
    headerText,
    mainIcon,
  };
}
