/** Категори контакт */
export enum ContactCategory {
  NoSelected = 'не выбрано',
  All = 'все',
  Relatives = 'родственники',
  Colleagues = 'коллеги',
}

/** Контакт */
export interface Contact {
  name: string;
  tel: string;
  email: string;
  category: ContactCategory;
  created: string;
}
