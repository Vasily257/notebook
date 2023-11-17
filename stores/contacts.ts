import { defineStore } from 'pinia';
import { ContactCategory } from '~/types/contact';
import type { Contact } from '~/types/contact';

/**
 * Имя символа для нового контакта.
 * Используется число, чтобы имя
 * можно было легко обновлять.
 */
let newContactSymbolName = 4;

export const useContactsStore = defineStore('contacts', () => {
  /** Список контактов, индексированные по id */
  const contacts = ref({
    [Symbol(0)]: {
      name: 'Айтишник Данила',
      tel: '9876547809',
      email: 'nelfeelingood@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [Symbol(1)]: {
      name: 'Арендодатель Виктория',
      tel: '9876547810',
      email: 'nelfeelingood1@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [Symbol(2)]: {
      name: 'Двери Вадим',
      tel: '9876547811',
      email: 'nelfeelingood2@gmail.com',
      category: ContactCategory.Colleagues,
      created: '23.09.23',
    },
    [Symbol(3)]: {
      name: 'Доставка Андрей Стоянов',
      tel: '9876547812',
      email: 'nelfeelingood3@gmail.com',
      category: ContactCategory.Colleagues,
      created: '24.09.23',
    },
  });

  /**
   * Добавить новый контакт
   * @param addedContact добавляемый контакт
   */
  const addContact = (addedContact: Contact) => {
    const newContactID = Symbol(newContactSymbolName);

    contacts.value[newContactID] = addedContact;

    // Обновить имя символа для нового контакта
    newContactSymbolName += 1;
  };

  /**
   * Обновить контакт
   * @param updatedContact обновляемый контакт
   */
  const updateContact = (updatedContact: Contact) => {
    contacts.value[updatedContact.id] = updatedContact;
  };

  /**
   * Удалить контакт
   * @param removedContactID идентификатор удаляемоего контакта
   */
  const removeContact = (removedContactID: symbol) => {
    delete contacts.value[removedContactID];
  };

  return { contacts, addContact, updateContact, removeContact };
});
