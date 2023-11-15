<script setup lang="ts">
import { computed } from 'vue';
import usePage from './composable/page';

const { isEditContactPage, isNewContact } = usePage();

/** CSS-классы для тега main */
const mainClassObject = computed(() => ({
  'main': true,
  'main--edit-or-new': isEditContactPage.value || isNewContact.value,
}));
</script>

<template>
  <TheHeader />
  <main :class="mainClassObject">
    <NuxtPage />
  </main>
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 40px);

  @media screen and (min-width: 900px) {
    min-height: calc(100vh - 48px);
  }

  &--edit-or-new {
    padding: 24px 12px;
    background-color: #f9fcff;
  }
}
</style>
