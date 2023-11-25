<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '~/stores/contacts';

const { isEditPage, isNewPage, goToHomePage } = usePage();
const { addContact } = useContactsStore();
</script>

<template>
  <h1 class="hidden-visually">Редактировать контакт</h1>
  <ContactForm
    :is-edit-page="isEditPage"
    :is-new-page="isNewPage"
    @add-contact="addContact"
    @go-to-home-page="goToHomePage"
  />
</template>
