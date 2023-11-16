<script setup lang="ts">
/** Лейблы контролов (инпутов) */
const controlLabels = [
  { id: 'name', text: 'Имя' },
  { id: 'tel', text: 'Телефон' },
  { id: 'email', text: 'E-mail' },
  { id: 'category', text: 'Категория' },
  { id: 'created', text: 'Создан' },
];

/** Варианты категорий */
const categoryOptions = ['Не выбрано', 'Родственники', 'Коллеги'];
</script>

<template>
  <form class="edit-contact" method="post" autocomplete="on" novalidate>
    <h2 class="edit-contact__title">Контакт</h2>
    <ul class="edit-contact__control-list">
      <li
        v-for="(label, index) in controlLabels"
        :key="label.id"
        class="edit-contact__control-item"
      >
        <ContactControl :label="label" :index="index" :category-options="categoryOptions" />
      </li>
    </ul>
    <EditContactButtons class="edit-contact__button-list" />
  </form>
</template>

<style lang="scss" scoped>
.edit-contact {
  width: 100%;
  padding: 35px 20px 48px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 0 rgba(148, 181, 225, 0.35);

  &__title {
    margin: 0;
    padding: 0;
    color: #545454;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }

  &__control-list {
    display: flex;
    row-gap: 16px;
    flex-flow: column nowrap;
    margin: 0;
    margin-top: 26px;
    padding: 0;
    list-style-type: none;
  }

  &__control-item {
    width: 100%;
  }

  &__button-list {
    margin-top: 32px;
  }
}
</style>
