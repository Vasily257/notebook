import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { ContactCategory } from '~/types/contact';
import type { Contact } from '~/types/contact';

export const useContactsStore = defineStore('contacts', () => {
  /** Список контактов, индексированные по id */
  const contacts = ref({
    [nanoid()]: {
      name: 'Айтишник Данила',
      tel: '9876547809',
      email: 'nelfeelingood@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [nanoid()]: {
      name: 'Арендодатель Виктория',
      tel: '9876547810',
      email: 'nelfeelingood1@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [nanoid()]: {
      name: 'Двери Вадим',
      tel: '9876547811',
      email: 'nelfeelingood2@gmail.com',
      category: ContactCategory.Colleagues,
      created: '23.09.23',
    },
    [nanoid()]: {
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
    const newContactID = nanoid();
    contacts.value[newContactID] = addedContact;
  };

  /**
   * Обновить контакт
   * @param id идентификатор обновляемого контакта
   * @param updatedContact контакт с обновленными данными
   */
  const updateContact = (id: string, updatedContact: Contact) => {
    contacts.value[id] = updatedContact;
  };

  /**
   * Удалить контакт
   * @param removedContactID идентификатор удаляемоего контакта
   */
  const removeContact = (removedContactID: string) => {
    delete contacts.value[removedContactID];
  };

  return { contacts, addContact, updateContact, removeContact };
});
