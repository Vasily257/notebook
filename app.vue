<script setup lang="ts">
import usePage from '~/composables/page';

const { isEditPage, isNewPage } = usePage();

/** CSS-классы для тега main */
const mainClass = computed(() => ({
  'main': true,
  'main--edit-or-new': isEditPage.value || isNewPage.value,
}));
</script>

<template>
  <TheHeader />
  <main :class="mainClass">
    <NuxtPage />
  </main>
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 40px);

  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 48px);
  }

  &--edit-or-new {
    padding: 24px 12px;
    background-color: #f9fcff;

    @media screen and (min-width: 768px) {
      padding: 24px 32px;
    }
  }
}
</style>
