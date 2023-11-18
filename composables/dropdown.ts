import { ref } from 'vue';

import not from '@/utils/not';

/**
 * Хук для управления выпадающим меню
 * @param options Значения выпадающего меню
 */
export default function useDropdown(options: string[]) {
  /** Открыто ли выпадающее меню */
  const isMenuOpened = ref(false);

  /** Опция, выбранная в меню */
  const currentOption = ref(options.length > 0 ? options[0] : '');

  /** Переключить видимость выпадающего меню */
  const toggleMenu = () => (isMenuOpened.value = not(isMenuOpened.value));

  /** Закрыть выпадающее меню */
  const closeMenu = () => (isMenuOpened.value = false);

  /** Выбрать новую опцию */
  const chooseOption = (event: Event) => {
    const eventTarget = event.target as HTMLElement;
    const buttonElement = eventTarget.closest('button');

    if (buttonElement?.textContent) {
      currentOption.value = buttonElement.textContent.trim();
    }

    closeMenu();
  };

  return {
    isMenuOpened,
    currentOption,
    toggleMenu,
    chooseOption,
  };
}
