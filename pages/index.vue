<script setup lang="ts">
import usePage from '~/composables/page';
import useScreenWidth from '~/composables/screenWidth';
import useContactsStore from '~/stores/contacts';
import { ContactCategory } from '~/types/contact';

const { goToNewPage } = usePage();
const { isSmall, isMedium } = useScreenWidth();
const { contacts } = useContactsStore();

/** Текущий фильтр */
const pageFilter = ref(ContactCategory.All);

/**
 * Обновить фильтр на странице
 * @param newFilter новое значение фильтра
 */
const updatePageFilter = (newFilter: ContactCategory) => {
  if (newFilter) {
    pageFilter.value = newFilter;
  }
};
</script>

<template>
  <h1 class="hidden-visually">Список контактов</h1>
  <ContactFilter
    :is-small-page-width="isSmall"
    @update-page-filter="updatePageFilter"
    @go-to-new-page="goToNewPage"
  />
  <ContactList
    :is-small-page-width="isSmall"
    :is-medium-page-width="isMedium"
    :category-filter="pageFilter"
    :contact-list="contacts"
  />
</template>
