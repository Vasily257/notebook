<script setup lang="ts">
import usePage from '~/composables/page';
import useModalsStore from '~/stores/modals';
import { ModalTypes } from '~/types/modal';

const { isEditPage, isNewPage } = usePage();
const { modals, closeModal } = useModalsStore();

useHead({
  title: 'Notebook',
  meta: [
    {
      name: 'description',
      content: 'This project is a notebook where you can add, edit and delete contacts.',
    },
  ],
});

/** CSS-классы для тега main */
const mainClass = computed(() => ({
  'main': true,
  'main--edit-or-new': isEditPage.value || isNewPage.value,
}));
</script>

<template>
  <TheHeader />
  <main :class="mainClass">
    <NuxtPage />
  </main>

  <!-- Модальное окно контактов -->
  <BaseModal
    :isOpened="modals[ModalTypes.contact].isOpened"
    :text="modals[ModalTypes.contact].text"
    isSelfClosing
    @close-modal="closeModal(ModalTypes.contact)"
  />
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 40px);

  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 48px);
  }

  &--edit-or-new {
    padding: 24px 12px;
    background-color: #f9fcff;

    @media screen and (min-width: 768px) {
      padding: 24px 32px;
    }
  }
}
</style>
