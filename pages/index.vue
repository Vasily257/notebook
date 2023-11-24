<script setup lang="ts">
import usePage from '~/composables/page';
import useContactsStore from '@/stores/contacts';
import { ContactCategory } from '~/types/contact';

const { goToNewPage } = usePage();
const { contacts } = useContactsStore();

/** Текущий фильтр */
const pageFilter = ref(ContactCategory.All);

/** Обновить фильтр на странице */
const updatePageFilter = (newFilter: ContactCategory) => {
  if (newFilter) {
    pageFilter.value = newFilter;
  }
};
</script>

<template>
  <h1 class="hidden-visually">Список контактов</h1>
  <ContactFilter @update-page-filter="updatePageFilter" @go-to-new-page="goToNewPage" />
  <ContactList :category-filter="pageFilter" :contact-list="contacts" />
</template>
