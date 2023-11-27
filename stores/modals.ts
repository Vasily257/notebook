import { defineStore } from 'pinia';
import type { Modals, ModalInfo, ModalTypes } from '~/types/modal';

/** Хранилище модальных окон */
const useModalsStore = defineStore('modals', () => {
  /** Список контактов, индексированные по id */
  const modals = ref<Modals>({
    contact: {
      isOpened: false,
      text: '',
    },
  });

  /**
   * Отобразить модальное окно
   * @param modalInfo текст внутри модального окна
   */
  const showModal = (modalInfo: ModalInfo) => {
    modals.value[modalInfo.type] = {
      isOpened: true,
      text: modalInfo.text,
    };
  };

  /**
   * Закрыть модальное окно
   * @param modalType тип мобильного окна
   */
  const closeModal = (modalType: ModalTypes) => {
    modals.value[modalType] = {
      ...modals.value[modalType],
      isOpened: false,
    };
  };

  return { modals, showModal, closeModal };
});

export default useModalsStore;
