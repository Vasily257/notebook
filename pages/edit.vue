<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '~/stores/contacts';
import useModalsStore from '~/stores/modals';

const { isEditPage, isNewPage, queryContactId, goToHomePage } = usePage();
const { getContact, updateContact, removeContact } = useContactsStore();
const { modals, showModal } = useModalsStore();

/** Данные текущего контакта */
const currentContact = getContact(queryContactId.value);
</script>

<template>
  <h1 class="hidden-visually">Создать новый контакт</h1>
  <ContactForm
    :is-edit-page="isEditPage"
    :is-new-page="isNewPage"
    :contact-id="queryContactId"
    :contact="currentContact"
    :modals="modals"
    @update-contact="updateContact"
    @remove-contact="removeContact"
    @show-modal="showModal"
    @go-to-home-page="goToHomePage"
  />
</template>
