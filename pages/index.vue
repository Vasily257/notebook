<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '@/stores/contacts';

const { goToNewPage } = usePage();
const { contacts } = useContactsStore();
</script>

<template>
  <h1 class="hidden-visually">Список контактов</h1>
  <ContactFilter @go-to-new-page="goToNewPage" />
  <ContactList :contact-list="contacts" />
</template>
