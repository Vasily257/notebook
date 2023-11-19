<script setup lang="ts">
import useForm from '~/composables/form';
import not from '@/utils/not';
import { ContactCategory } from '~/types/contact';

/** Поля ввода */
const inputs = [
  {
    name: 'name',
    labelText: 'Имя',
    placeholder: 'Например «Андрей»...',
  },
  { name: 'tel', type: 'tel', labelText: 'Телефон', placeholder: '+7(___)___-__-__' },
  {
    name: 'email',
    type: 'email',
    labelText: 'E-mail',
    placeholder: 'Например «pochta@domain.ru»...',
  },
  { name: 'category', labelText: 'Категория' },
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
const categoryOptions = [
  ContactCategory.NoSelected,
  ContactCategory.Relatives,
  ContactCategory.Colleagues,
];

/** Информация полей формы */
const form = reactive(useForm(fieldOptions));
</script>

<template>
  <div class="new-contact">
    <h2 class="new-contact__title">Новый контакт</h2>
    <ul class="new-contact__control-list">
      <li v-for="(input, index) in inputs" :key="input.name" class="new-contact__item">
        <label :for="input.name" class="new-contact__label">{{ input.labelText }}</label>
        <BaseInput
          v-if="index < 3"
          :id="input.name"
          :name="input.name"
          :type="input.type"
          v-model="form.values[input.name]"
          :placeholder="input.placeholder"
          :label-text="input.labelText"
          class="new-contact__input"
        />
        <BaseDropdown
          v-if="index === 3"
          :id="input.name"
          :name="input.name"
          :options="categoryOptions"
          class="new-contact__dropdown"
        />
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

  &__item {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 40px;
    margin: 0;
    padding: 0;
  }

  &__label {
    width: 72px;
    margin-right: 12px;
    color: #545454;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 576px) {
      width: 136px;
    }
  }

  &__input {
    line-height: 1.6;
  }

  &__dropdown {
    font-size: 12px;
    font-weight: 400;
  }

  &__save-button {
    margin-top: 32px;
    margin-left: 84px;
    background-color: #ffc700;
    font-weight: 700;

    &:hover {
      background-color: #ffd84c;
    }
  }
}
</style>
