<script setup lang="ts">
import usePage from '~/composables/page';
import { useContactsStore } from '~/stores/contacts';

const { isEditPage, isNewPage, queryContactId } = usePage();
const { getContact } = useContactsStore();

/** Данные текущего контакта */
const currentContact = getContact(queryContactId);
</script>

<template>
  <h1 class="hidden-visually">Создать новый контакт</h1>
  <ContactForm :is-edit-page="isEditPage" :is-new-page="isNewPage" :contact="currentContact" />
</template>
