<script setup lang="ts">
import useScreenWidth from '~/composables/screenWidth.js';
import { useContactsStore } from '@/stores/contacts';
import formatTel from '~/utils/formatTel';

/** Хранилище «Контакты» */
const contactsStore = useContactsStore();

const { contacts } = contactsStore;

const { isSmall, isMedium } = useScreenWidth();
</script>

<template>
  <div class="contacts">
    <div class="contacts__title-box">
      <span class="contacts__title contacts__title--name">Контакт</span>
      <template v-if="isMedium">
        <span class="contacts__title contacts__title--phone">Телефон</span>
        <span class="contacts__title contacts__title--email">E-mail</span>
      </template>
      <template v-else>
        <span class="contacts__title contacts__title--phone-email">Телефон / e-mail</span>
      </template>
      <span class="contacts__title contacts__title--created">Создан</span>
    </div>
    <ul class="contacts__list">
      <li v-for="(contact, contactId) in contacts" :key="contactId" class="contacts__list-item">
        <span class="contacts__item-text contacts__item-text--name">
          <span v-if="isSmall" class="contacts__item-icon">{{ contact.name[0] }}</span>
          {{ contact.name }}</span
        >
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

  @media screen and (min-width: 768px) {
    padding: 12px 32px 16px;
  }

  &__title-box {
    display: grid;
    column-gap: 4px;
    grid-template-columns: 1fr 1fr 0.4fr;
    min-height: 24px;

    @media screen and (min-width: 576px) {
      column-gap: 8px;
      grid-template-columns: 23fr 30fr 14fr;
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 30fr 14fr 27fr 14fr;
    }
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

    &--phone {
      grid-column: 2 / 3;
    }

    &--email {
      grid-column: 3 / 4;
    }

    &--created {
      grid-column: 3 / 4;
      text-align: right;

      @media screen and (min-width: 768px) {
        grid-column: 4 / 5;
      }
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
    grid-template-columns: 1fr 1fr 0.4fr;
    grid-template-rows: repeat(2, min-content);
    min-height: 57px;
    border-top: 1px solid #eaf2fd;

    @media screen and (min-width: 576px) {
      grid-template-columns: 23fr 30fr 14fr;
      min-height: 49px;
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 30fr 14fr 27fr 14fr;
      grid-template-rows: min-content;
    }

    &:first-child {
      min-height: 56px;
      border-top: none;

      @media screen and (min-width: 576px) {
        min-height: 48px;
      }
    }
  }

  &__item-text {
    align-self: center;
    color: #545454;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.25;

    @media screen and (min-width: 576px) {
      line-height: 1.5;
    }

    &--name {
      display: flex;
      align-items: center;
      column-gap: 8px;
      flex-flow: row nowrap;
      grid-column: 1 / 2;
      grid-row: 1 / 3;

      @media screen and (min-width: 576px) {
        max-width: 85%;
      }

      @media screen and (min-width: 768px) {
        grid-row: 1 / 2;
      }
    }

    &--tel {
      grid-column: 2 / 3;
      grid-row: 1 / 2;

      @media screen and (min-width: 768px) {
        grid-row: 1 / 2;
      }
    }

    &--email {
      grid-column: 2 / 3;
      grid-row: 2 / 3;

      @media screen and (min-width: 768px) {
        grid-column: 3/ 4;
        grid-row: 1 / 2;
      }
    }

    &--created {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      text-align: right;
      font-size: 10px;

      @media screen and (min-width: 576px) {
        font-size: 12px;
      }

      @media screen and (min-width: 768px) {
        grid-column: 4 / 5;
        grid-row: 1 / 2;
      }
    }
  }

  &__item-icon {
    display: inline-block;
    min-width: 24px;
    min-height: 24px;
    text-align: center;
    color: #545454;
    border-radius: 50%;
    background-color: #ffc700;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
  }
}
</style>
