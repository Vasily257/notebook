<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '~/stores/contacts';
import not from '~/utils/not';

const { queryContactId, isHomePage, isEditPage, isNewPage } = usePage();
const { getContact } = useContactsStore();

/** CSS-классы для контента */
const contentClass = computed(() => {
  return {
    'header__content': true,
    'header__content--home-page': isHomePage.value,
    'header__content--new-page': isNewPage.value,
  };
});

/** CSS-классы для главной иконки */
const mainIconClass = computed(() => {
  return {
    'header__main-icon': true,
    'header__main-icon--home-page': isHomePage.value,
  };
});

/** Название главной иконки */
const mainIconName = computed(() => {
  return isNewPage.value ? 'new-user' : 'contacts';
});

/** CSS-классы для текста */
const textClass = computed(() => {
  return {
    'header__text': true,
    'header__text--home-page': isHomePage.value,
    'header__text--new-page': isNewPage.value,
  };
});

/** Текст в шапке сайта */
const headerText = computed(() => {
  let headerText = 'Книга контактов';

  if (isEditPage.value) {
    headerText = getContact(queryContactId.value).name;
  }

  if (isNewPage.value) {
    headerText = 'Добавить контакт';
  }

  return headerText;
});
</script>

<template>
  <header class="header">
    <div :class="contentClass">
      <BaseIcon v-if="not(isEditPage)" :class="mainIconClass" :icon-name="mainIconName" />
      <span v-else class="header__first-letter">{{ headerText[0] }}</span>
      <span :class="textClass">{{ headerText }}</span>
    </div>
    <BaseLink v-if="not(isHomePage)" to="/" class="header__close-link">
      <BaseIcon icon-name="close" class="header__close-icon" />
    </BaseLink>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  min-height: 40px;
  padding: 0 12px;
  background-color: #282828;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 992px) {
    min-height: 48px;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 48px;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    flex-flow: row nowrap;
    margin: 0 auto;

    &--home-page {
      justify-content: flex-start;
      column-gap: 4px;
      margin: 0;
      text-transform: uppercase;

      @media screen and (min-width: 576px) {
        column-gap: 8px;
      }

      @media screen and (min-width: 992px) {
        column-gap: 16px;
      }
    }

    &--new-page {
      @media screen and (min-width: 768px) {
        column-gap: 4px;
      }

      @media screen and (min-width: 992px) {
        column-gap: 8px;
      }
    }
  }

  &__main-icon {
    width: 16px;
    height: 16px;

    @media screen and (min-width: 992px) {
      width: 24px;
      height: 24px;
    }

    &--home-page {
      width: 31px;
      height: 24px;

      @media screen and (min-width: 992px) {
        width: 42px;
        height: 32px;
      }
    }
  }

  &__first-letter {
    width: 20px;
    height: 20px;
    text-align: center;
    color: #545454;
    border-radius: 50%;
    background-color: #ffc700;
    font-size: 10px;
    font-weight: 700;
    line-height: 20px;

    @media screen and (min-width: 992px) {
      width: 24px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
    }
  }

  &__text {
    color: #dddddd;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 992px) {
      font-size: 20px;
    }

    &--home-page {
      @media screen and (min-width: 992px) {
        font-size: 18px;
      }
    }
  }

  &__close-link {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    line-height: 0;

    @media screen and (min-width: 768px) {
      right: 32px;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  &__close-icon {
    width: 24px;
    height: 24px;

    @media screen and (min-width: 992px) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
