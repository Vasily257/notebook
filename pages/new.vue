<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '~/stores/contacts';
import useModalsStore from '~/stores/modals';

const { isEditPage, isNewPage, goToHomePage } = usePage();
const { addContact } = useContactsStore();
const { modals, showModal } = useModalsStore();
</script>

<template>
  <h1 class="hidden-visually">Редактировать контакт</h1>
  <ContactForm
    :is-edit-page="isEditPage"
    :is-new-page="isNewPage"
    :modals="modals"
    @add-contact="addContact"
    @show-modal="showModal"
    @go-to-home-page="goToHomePage"
  />
</template>
