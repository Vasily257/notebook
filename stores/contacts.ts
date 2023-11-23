import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { ContactCategory } from '~/types/contact';
import type { Contact } from '~/types/contact';

export const useContactsStore = defineStore('contacts', () => {
  /** Список контактов, индексированные по id */
  const contacts = ref({
    [nanoid(6)]: {
      name: 'Айтишник Данила',
      tel: '79876547809',
      email: 'nelfeelingood@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [nanoid(6)]: {
      name: 'Арендодатель Виктория',
      tel: '79876547810',
      email: 'nelfeelingood1@gmail.com',
      category: ContactCategory.Colleagues,
      created: '22.09.23',
    },
    [nanoid(6)]: {
      name: 'Двери Вадим',
      tel: '79876547811',
      email: 'nelfeelingood2@gmail.com',
      category: ContactCategory.Colleagues,
      created: '23.09.23',
    },
    [nanoid(6)]: {
      name: 'Доставка Андрей Стоянов',
      tel: '79876547812',
      email: 'nelfeelingood3@gmail.com',
      category: ContactCategory.Colleagues,
      created: '24.09.23',
    },
  });

  /**
   * Получить информацию по контакту
   * @param contactID id контакта
   */
  const getContact = (contactID: string) => {
    return contacts.value[contactID];
  };

  /**
   * Добавить новый контакт
   * @param addedContact добавляемый контакт
   */
  const addContact = (addedContact: Contact) => {
    if (addedContact) {
      const newContactID = nanoid(6);
      contacts.value[newContactID] = addedContact;
    }
  };

  /**
   * Обновить контакт
   * @param id идентификатор обновляемого контакта
   * @param updatedContact контакт с обновленными данными
   */
  const updateContact = (id: string, updatedContact: Contact) => {
    if (id && updatedContact) {
      contacts.value[id] = {
        ...contacts.value[id],
        name: updatedContact.name,
        tel: updatedContact.tel,
        email: updatedContact.email,
        category: updatedContact.category,
      };
    }
  };

  /**
   * Удалить контакт
   * @param removedContactID идентификатор удаляемоего контакта
   */
  const removeContact = (removedContactID: string) => {
    if (removedContactID) {
      delete contacts.value[removedContactID];
    }
  };

  return { contacts, getContact, addContact, updateContact, removeContact };
});
