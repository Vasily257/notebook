<script setup lang="ts">
const inputLabels = [
  { id: 'name', text: 'Имя' },
  { id: 'tel', text: 'Телефон' },
  { id: 'email', text: 'E-mail' },
  { id: 'categoty', text: 'Категория' },
  { id: 'created', text: 'Создан' },
];
</script>

<template>
  <div class="new-contact">
    <h2 class="new-contact__title">Контакт</h2>
    <ul class="new-contact__control-list">
      <li v-for="(label, index) in inputLabels" :key="label.id" class="new-contact__control-item">
        <EditContactControl :label="label" :index="index" />
      </li>
    </ul>
    <EditContactButtons class="new-contact__button-list" />
  </div>
</template>

<style lang="scss" scoped>
.new-contact {
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
