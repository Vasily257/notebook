<script setup lang="ts">
import usePage from '~/composables/page';

const { goToNewPage } = usePage();
</script>

<template>
  <h1 class="hidden-visually">Список контактов</h1>
  <ContactFilter @go-to-new-page="goToNewPage" />
  <ContactList />
</template>
