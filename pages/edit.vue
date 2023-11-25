<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '~/stores/contacts';

const { isEditPage, isNewPage, queryContactId, goToHomePage } = usePage();
const { getContact, updateContact, removeContact } = useContactsStore();

/** Данные текущего контакта */
const currentContact = getContact(queryContactId);
</script>

<template>
  <h1 class="hidden-visually">Создать новый контакт</h1>
  <ContactForm
    :is-edit-page="isEditPage"
    :is-new-page="isNewPage"
    :contact-id="queryContactId"
    :contact="currentContact"
    @update-contact="updateContact"
    @remove-contact="removeContact"
    @go-to-home-page="goToHomePage"
  />
</template>
