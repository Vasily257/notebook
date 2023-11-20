/** Категори контакт */
export enum ContactCategory {
  NoSelected = 'Не выбрано',
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
