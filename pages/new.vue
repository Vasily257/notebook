<script setup lang="ts">
import usePage from '~/composables/page';

const { isEditPage, isNewPage } = usePage();
</script>

<template>
  <h1 class="hidden-visually">Редактировать контакт</h1>
  <ContactForm :is-edit-page="isEditPage" :is-new-page="isNewPage" />
</template>
