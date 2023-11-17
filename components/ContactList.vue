<script setup lang="ts">
import { useContactsStore } from '@/stores/contacts';
import formatTel from '~/utils/formatTel';

/** Хранилище «Контакты» */
const contactsStore = useContactsStore();

/** Список контактов */
const { contacts } = contactsStore;
</script>

<template>
  <div class="contacts">
    <div class="contacts__title-box">
      <span class="contacts__title contacts__title--name">Контакт</span>
      <span class="contacts__title contacts__title--phone-email">Телефон / e-mail</span>
      <span class="contacts__title contacts__title--created">Создан</span>
    </div>
    <ul class="contacts__list">
      <li v-for="(contact, contactId) in contacts" :key="contactId" class="contacts__list-item">
        <span class="contacts__item-text contacts__item-text--name">{{ contact.name }}</span>
        <span class="contacts__item-text contacts__item-text--tel">{{
          formatTel(contact.tel)
        }}</span>
        <span class="contacts__item-text contacts__item-text--email">{{ contact.email }}</span>
        <span class="contacts__item-text contacts__item-text--created">{{ contact.created }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  position: relative;
  height: fit-content;
  padding: 12px;

  &__title-box {
    display: grid;
    column-gap: 4px;
    grid-template-columns: 1fr 1fr 0.4fr;
    min-height: 24px;
  }

  &__title {
    text-transform: uppercase;
    color: #b5b5b5;
    font-size: 10px;
    font-weight: 400;
    line-height: 24px;

    &--name {
      grid-column: 1 / 2;
    }

    &--phone-email {
      grid-column: 2 / 3;
    }

    &--created {
      grid-column: 3 / 4;
      text-align: right;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__list-item {
    display: grid;
    align-content: center;
    column-gap: 4px;
    row-gap: 5px;
    grid-template-columns: 1fr 1fr 0.4fr;
    grid-template-rows: repeat(2, min-content);
    min-height: 57px;
    border-top: 1px solid #eaf2fd;

    &:first-child {
      min-height: 56px;
      border-top: none;
    }
  }

  &__item-text {
    align-self: center;
    color: #545454;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;

    &--name {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    &--tel {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    &--email {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    &--created {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      text-align: right;
      font-size: 10px;
    }
  }
}
</style>
