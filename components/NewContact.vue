<script setup lang="ts">
const inputLabels = [
  { id: 'name', text: 'Имя' },
  { id: 'tel', text: 'Телефон' },
  { id: 'email', text: 'E-mail' },
  { id: 'category', text: 'Категория' },
];

const categoryOptions = ['Не выбрано', 'Родственники', 'Коллеги'];
</script>

<template>
  <div class="new-contact">
    <h2 class="new-contact__title">Новый контакт</h2>
    <ul class="new-contact__control-list">
      <li v-for="(label, index) in inputLabels" :key="label.id" class="new-contact__control-item">
        <ContactControl
          :label="label"
          :index="index"
          :category-options="label.id === 'category' ? categoryOptions : []"
        />
      </li>
    </ul>
    <BaseButton class="new-contact__save-button">
      <BaseIcon icon-name="save" />
      СОХРАНИТЬ
    </BaseButton>
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

  &__save-button {
    margin-top: 32px;
    margin-left: 84px;
    background-color: #ffc700;

    &:hover {
      background-color: #ffd84c;
    }
  }
}
</style>
