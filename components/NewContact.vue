<script setup lang="ts">
import useForm from '@/composable/form';
import not from '@/utils/not';

const inputLabels = [
  { name: 'name', text: 'Имя' },
  { name: 'tel', text: 'Телефон' },
  { name: 'email', text: 'E-mail' },
  { name: 'category', text: 'Категория' },
];

/** Начальные значения и правила валидации для полей формы */
const fieldOptions = [
  {
    name: 'name',
    value: '',
    rules: {
      minLength: 3,
      required: true,
    },
  },
  {
    name: 'tel',
    value: '',
    rules: {
      equalLength: 10,
      required: true,
    },
  },
  {
    name: 'email',
    value: '',
    rules: {
      required: true,
    },
  },
  {
    name: 'category',
    value: '',
    rules: {
      required: true,
    },
  },
];

/** Варианты категорий */
const categoryOptions = ['Не выбрано', 'Родственники', 'Коллеги'];

/** Информация полей формы */
const form = reactive(useForm(fieldOptions));
</script>

<template>
  <div class="new-contact">
    <h2 class="new-contact__title">Новый контакт</h2>
    <ul class="new-contact__control-list">
      <li v-for="(label, index) in inputLabels" :key="label.name" class="new-contact__control-item">
        <BaseControl :control-id="label.name" :label-text="label.text">
          <BaseInput
            v-if="index < 3"
            :id="label.name"
            :name="label.name"
            v-model="form.values[label.name]"
          />
          <BaseDropdown
            v-if="index === 3"
            :id="label.name"
            :name="label.name"
            :options="categoryOptions"
          />
        </BaseControl>
      </li>
    </ul>
    <BaseButton class="new-contact__save-button" :disabled="not(form.isValid)">
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
