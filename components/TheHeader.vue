<script setup lang="ts">
import useHeader from '@/composable/header';

const { isCloseShown, mainIcon } = useHeader();
</script>

<template>
  <header class="header">
    <BaseIcon :icon-name="mainIcon.name" :width="mainIcon.width" :height="mainIcon.height" />
    <span class="header__text header__text--uppercase">Книга контактов</span>
    <BaseIcon
      v-if="isCloseShown"
      class="header__close-icon"
      icon-name="close"
      :width="24"
      :height="24"
    />
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  column-gap: 4px;
  flex-flow: row nowrap;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background-color: #282828;

  &__text {
    color: #dddddd;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;

    &--uppercase {
      text-transform: uppercase;
    }
  }

  &__close-icon {
    margin-left: auto;
  }
}
</style>
