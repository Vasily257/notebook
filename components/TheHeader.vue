<script setup lang="ts">
import usePage from '@/composables/page';
import not from '~/utils/not.jsx';

const { isHomePage, isEditContactPage, isNewContact } = usePage();

/** CSS-классы для контента */
const contentClassObject = computed(() => {
  return {
    'header__content': true,
    'header__content--home-page': isHomePage.value,
    'header__content--new-page': isNewContact.value,
  };
});

/** CSS-классы для главной иконки */
const mainIconClassObject = computed(() => {
  return {
    'header__main-icon': true,
    'header__main-icon--home-page': isHomePage.value,
  };
});

/** Название главной иконки */
const mainIconName = computed(() => {
  return isNewContact.value ? 'new-user' : 'contacts';
});

/** CSS-классы для текста */
const textClass = computed(() => {
  return {
    'header__text': true,
    'header__text--home-page': isHomePage.value,
    'header__text--new-page': isNewContact.value,
  };
});

/** Текст в шапке сайта */
const headerText = computed(() => {
  let headerText = 'Книга контактов';

  if (isEditContactPage.value) {
    headerText = 'Двери Вадим';
  }

  if (isNewContact.value) {
    headerText = 'Добавить контакт';
  }

  return headerText;
});
</script>

<template>
  <header class="header">
    <div :class="contentClassObject">
      <BaseIcon
        v-if="not(isEditContactPage)"
        :class="mainIconClassObject"
        :icon-name="mainIconName"
      />
      <span v-else class="header__first-letter">{{ headerText[0] }}</span>
      <span :class="textClass">{{ headerText }}</span>
    </div>
    <BaseButton v-if="not(isHomePage)" class="header__close-button">
      <BaseIcon class="header__close-icon" icon-name="close" />
    </BaseButton>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background-color: #282828;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 992px) {
    height: 48px;
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
  }

  &__text {
    color: #dddddd;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;

    &--home-page {
      @media screen and (min-width: 992px) {
        font-size: 18px;
      }
    }

    &--new-page {
      @media screen and (min-width: 992px) {
        font-size: 20px;
      }
    }
  }

  &__close-button {
    position: absolute;
    top: 50%;
    right: 12px;
    padding: 0;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;

    @media screen and (min-width: 768px) {
      right: 32px;
    }

    &:hover {
      background-color: transparent;
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
