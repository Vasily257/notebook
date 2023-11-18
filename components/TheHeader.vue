<script setup lang="ts">
import useHeader from '@/composables/header';

import not from '~/utils/not.jsx';

const { isHomePage, mainIcon, headerText } = useHeader();

/** CSS-классы для контента в шапке сайта */
const headerContentClassObject = computed(() => {
  return {
    'header__content': true,
    'header__content--home-page': isHomePage.value,
  };
});
</script>

<template>
  <header class="header">
    <div :class="headerContentClassObject">
      <BaseIcon
        v-if="mainIcon.isVisible"
        :icon-name="mainIcon.name"
        :width="mainIcon.width"
        :height="mainIcon.height"
      />
      <span v-else class="header__first-letter-of-contact">{{ headerText[0] }}</span>
      <span class="header__text">{{ headerText }}</span>
    </div>
    <BaseButton v-if="not(isHomePage)" class="header__close-button">
      <BaseIcon icon-name="close" :width="24" :height="24" />
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
    }
  }

  &__first-letter-of-contact {
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
  }

  &__close-button {
    position: absolute;
    top: 50%;
    right: 12px;
    padding: 0;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
