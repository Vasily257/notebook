/** Типы модальных окон */
export enum ModalTypes {
  contact = 'contact',
}

/** Состояние модального окна */
export type ModalState = {
  isOpened: boolean;
  text: string;
};

/** Список модальных окон */
export type Modals = Record<string, ModalState>;

/** Настройки модального окна при его открытии */
export interface ModalInfo {
  /** Тип модального окна */
  type: ModalTypes;
  /** Текст внутри модального окна */
  text: string;
}
