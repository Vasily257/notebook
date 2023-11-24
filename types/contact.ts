/** Категори контакт */
export enum ContactCategory {
  All = 'Все',
  Relatives = 'Родственники',
  Colleagues = 'Коллеги',
}

/** Контакт */
export interface Contact {
  name: string;
  tel: string;
  email: string;
  category: ContactCategory;
  created: string;
}

/** Список контактов */
export type ContactList = Record<string, Contact>;
