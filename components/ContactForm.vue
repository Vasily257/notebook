<script setup lang="ts">
import useForm from '~/composables/form';
import { ContactCategory } from '~/types/contact';

/** Пропсы компонента */
interface Props {
  /** Страница, на которой используется форма */
  page?: string;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  page: '',
});

/** Поля ввода */
const INPUTS = [
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

/** Правила валидации для полей ввода */
const INPUT_VALIDATION_OPTIONS = [
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
const CATEGORY_OPTIONS = [
  ContactCategory.NoSelected,
  ContactCategory.Relatives,
  ContactCategory.Colleagues,
];

/** Информация полей формы */
const form = reactive(useForm(INPUT_VALIDATION_OPTIONS));

/** Используется ли компонент на странице "Новый контакт" */
const isNewPage = props.page === 'new';

/** Используется ли компонент на странице "Редактировать контакт" */
const isEditPage = props.page === 'edit';

/** Заголовок формы */
const title = computed(() => {
  let title = '';

  if (isNewPage) title = 'Новый контакт';
  if (isEditPage) title = 'Контакт';

  return title;
});
</script>

<template>
  <form class="contact-form">
    <h2 class="contact-form__title">{{ title }}</h2>
    <ul class="contact-form__control-list">
      <li v-for="(input, index) in INPUTS" :key="input.name" class="contact-form__item">
        <label :for="input.name" class="contact-form__label">{{ input.labelText }}</label>
        <BaseInput
          v-if="index < 3"
          :id="input.name"
          :name="input.name"
          :type="input.type"
          v-model="form.values[input.name]"
          :placeholder="input.placeholder"
          class="contact-form__input"
        />
        <BaseDropdown
          v-if="index === 3"
          :id="input.name"
          :name="input.name"
          :options="CATEGORY_OPTIONS"
          class="contact-form__dropdown"
        />
        <span v-if="index === 4 && isEditPage" class="contact-form__plain-text">23.09.23</span>
      </li>
    </ul>
    <ContactFormButtons :has-remove-button="isEditPage" />
  </form>
</template>

<style lang="scss" scoped>
.contact-form {
  max-width: 704px;
  margin: 0 auto;
  padding: 35px 20px 48px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 0 rgba(148, 181, 225, 0.35);

  @media screen and (min-width: 576px) {
    padding: 35px 48px 48px;
  }

  @media screen and (min-width: 768px) {
    padding: 51px 64px 64px;
  }

  &__title {
    margin: 0;
    padding: 0;
    color: #545454;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 992px) {
      font-size: 32px;
    }
  }

  &__control-list {
    display: flex;
    row-gap: 16px;
    flex-flow: column nowrap;
    margin: 0;
    margin-top: 26px;
    padding: 0;
    list-style-type: none;

    @media screen and (min-width: 992px) {
      margin-top: 28px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 12px;
    flex-flow: row nowrap;
    height: 40px;
    margin: 0;
    padding: 0;

    @media screen and (min-width: 576px) {
      column-gap: 32px;
    }
  }

  &__label {
    width: 72px;
    color: #545454;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 576px) {
      width: 136px;
    }

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }
  }

  &__input {
    line-height: 1.6;

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }
  }

  &__dropdown {
    font-size: 12px;
    font-weight: 400;

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }
  }

  &__save-button {
    width: 124px;
    margin-top: 32px;
    margin-left: 84px;
    background-color: #ffc700;
    font-size: 12px;
    font-weight: 700;

    @media screen and (min-width: 576px) {
      margin-left: 168px;
    }

    @media screen and (min-width: 992px) {
      font-size: 14px;
      height: 40px;
      width: 136px;
    }

    &:hover {
      background-color: #ffd84c;
    }
  }
}
</style>
