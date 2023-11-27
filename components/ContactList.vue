<script setup lang="ts">
import { getFullTel } from '~/utils/formatTel';
import { removeTime, compareDates } from '~/utils/formatDate';
import { ContactCategory, type Contact, type ContactList } from '~/types/contact';

/** Типы пропсов */
interface Props {
  /** Отрисовывается ли компонент на странице с small шириной */
  isSmallPageWidth?: boolean;
  /** Отрисовывается ли компонент на странице с medium шириной */
  isMediumPageWidth?: boolean;
  /** Текущий фильтр по категории */
  categoryFilter?: ContactCategory;
  /** Список контактов */
  contactList?: ContactList;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  pageFilter: ContactCategory.All,
  contactList: () => ({} as ContactList),
});

/** Отфильтрованные и отсортированные контакты в формате массива */
const filtredAndSortedContacs = computed(() => {
  /** Контакты в формате [contactId, contact] */
  let contacts: Array<[string, Contact]> = [];

  contacts = Object.entries(props.contactList)
    // Отфильтровать контакты по категории
    .filter(([, contact]) => {
      const isRequiredCategory = contact.category === props.categoryFilter;
      const isCommonCategoryFilter = props.categoryFilter === ContactCategory.All;

      return isRequiredCategory || isCommonCategoryFilter;
    })
    // Отсортировать контакты по дате создания (более новые — снизу)
    .sort(([, contactA], [, contactB]) => {
      return compareDates(contactA.created, contactB.created);
    });

  return contacts;
});
</script>

<template>
  <div class="contact-list">
    <!-- Названия столбцов -->
    <div class="contact-list__title-box">
      <span class="contact-list__title contact-list__title--name">Контакт</span>
      <template v-if="isMediumPageWidth">
        <span class="contact-list__title contact-list__title--phone">Телефон</span>
        <span class="contact-list__title contact-list__title--email">E-mail</span>
      </template>
      <template v-else>
        <span class="contact-list__title contact-list__title--phone-email">Телефон / e-mail</span>
      </template>
      <span class="contact-list__title contact-list__title--created">Создан</span>
    </div>

    <!-- Контакты -->
    <ul class="contact-list__list">
      <li
        v-for="[contactId, contact] in filtredAndSortedContacs"
        :key="contactId"
        class="contact-list__item"
      >
        <BaseLink :to="`/edit?contactId=${contactId}`" class="contact-list__item-inner">
          <span class="contact-list__item-text contact-list__item-text--name">
            <span v-if="isSmallPageWidth" class="contact-list__item-icon">
              {{ contact.name[0] }}</span
            >
            {{ contact.name }}</span
          >
          <span class="contact-list__item-text contact-list__item-text--tel">{{
            getFullTel(contact.tel)
          }}</span>
          <span class="contact-list__item-text contact-list__item-text--email">{{
            contact.email
          }}</span>
          <span class="contact-list__item-text contact-list__item-text--created">{{
            removeTime(contact.created)
          }}</span>
        </BaseLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.contact-list {
  position: relative;
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

    @media screen and (min-width: 992px) {
      justify-content: space-between;
      grid-template-columns: 296px 112px 208px 112px;
      max-width: 990px;
      margin: 0 auto;
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

  &__item {
    max-width: 990px;
    margin: 0 auto;
    border-top: 1px solid #eaf2fd;

    &:first-child {
      border-top: none;
    }
  }

  &__item-inner {
    display: grid;
    align-content: center;
    column-gap: 4px;
    grid-template-columns: 1fr 1fr 0.4fr;
    grid-template-rows: repeat(2, min-content);
    min-height: 57px;

    @media screen and (min-width: 576px) {
      grid-template-columns: 23fr 30fr 14fr;
      min-height: 49px;
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 30fr 14fr 27fr 14fr;
      grid-template-rows: min-content;
    }

    @media screen and (min-width: 992px) {
      justify-content: space-between;
      grid-template-columns: 296px 112px 208px 112px;
    }

    &:first-child {
      min-height: 56px;

      @media screen and (min-width: 576px) {
        min-height: 48px;
      }
    }
  }

  &__item-text {
    overflow: hidden;
    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
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
      white-space: wrap;

      @media screen and (min-width: 576px) {
        max-width: 85%;
      }

      @media screen and (min-width: 768px) {
        grid-row: 1 / 2;
        max-width: 100%;
      }

      @media screen and (min-width: 992px) {
        font-size: 14px;
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
        font-size: 12px;
      }

      @media screen and (min-width: 992px) {
        font-size: 14px;
      }
    }
  }

  &__item-icon {
    display: inline-block;
    min-width: 24px;
    min-height: 24px;
    text-align: center;
    text-transform: uppercase;
    color: #545454;
    border-radius: 50%;
    background-color: #ffc700;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
  }
}
</style>
