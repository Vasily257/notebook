<script setup lang="ts">
import { useContactsStore } from '~/stores/contacts';
import useForm from '~/composables/form';
import formatTel from '~/utils/formatTel';
import { getNow, removeTime } from '~/utils/formatDate';
import not from '~/utils/not';
import { ContactCategory, type Contact } from '~/types/contact';

/** Пропсы компонента */
interface Props {
  /** Используется ли компонент на странице нового контакта */
  isNewPage?: boolean;
  /** Используется ли компонент на странице редактирования контакта */
  isEditPage?: boolean;
  /** ID текущего контакта */
  contactId?: string;
  /** Информация по текущему контакту */
  contact?: Contact;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  isNewPage: false,
  isEditPage: false,
  contactId: '',
});

/** Заголовки формы */
const TITLES = {
  editPage: 'Контакт',
  newPage: 'Новый контакт',
};

/** Поля формы */
const FIELDS = [
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
  { name: 'created', labelText: 'Создан' },
];

/** Варианты категорий */
const CATEGORY_OPTIONS = [
  ContactCategory.NoSelected,
  ContactCategory.Relatives,
  ContactCategory.Colleagues,
];

/** Отформатированный номер телефона */
const formattedTel = computed(() => {
  return props.contact?.tel ? formatTel(props.contact?.tel) : '';
});

/** Правила валидации для полей ввода */
const inputValidationOptions = [
  {
    name: 'name',
    value: props.contact?.name || '',
    rules: {
      minLength: 3,
      required: true,
    },
  },
  {
    name: 'tel',
    value: formattedTel.value || '',
    rules: {
      length: 16,
      required: true,
    },
  },
  {
    name: 'email',
    value: props.contact?.email || '',
    rules: {
      required: true,
    },
  },
  {
    name: 'category',
    value: props.contact?.category || ContactCategory.NoSelected,
    rules: {
      required: true,
    },
  },
];

const { addContact, updateContact, removeContact } = useContactsStore();

/** Данные формы */
const form = reactive(useForm(inputValidationOptions));

/** Отправляется ли запрос на сохранение контакта */
const isSaving = ref(false);

/** Отправляется ли запрос на обновление контакта */
const isUpdating = ref(false);

/** Отправляется ли запрос на удаление контакта */
const isRemoving = ref(false);

/** Отображаемые поля формы */
const displayedFields = computed(() => {
  return props.isNewPage ? FIELDS.slice(0, 4) : FIELDS;
});

/** Заголовок формы */
const title = computed(() => {
  let title = '';

  if (props.isEditPage) title = TITLES.editPage;
  if (props.isNewPage) title = TITLES.newPage;

  return title;
});

/** CSS-классы для кнопок */
const buttonsClass = computed(() => {
  return {
    'contact-form__buttons': true,
    'contact-form__buttons--with-remove': props.isEditPage,
  };
});

/** Название иконки для иконки сохранения */
const saveIconName = computed(() => {
  return isSaving.value || isUpdating.value ? 'waiting' : 'save';
});

/** Название иконки для иконки удаления */
const removeIconName = computed(() => {
  return isRemoving.value ? 'waiting' : 'remove';
});

/** Обновляемые данные контакта */
const updatedContact = computed(() => ({
  name: form.values.name,
  tel: form.values.tel,
  email: form.values.email,
  category: form.values.category as ContactCategory,
  created: isSaving ? getNow() : '',
}));

/** Обработать клик по полю ввода */
const handleInputClick = (event: Event) => {
  const target = event.target as HTMLInputElement;

  form.hideError(target.name);
};

/** Сохранить (обновить) контакт */
const saveContact = () => {
  isSaving.value = true;

  props.isNewPage && addContact(updatedContact.value);
  props.isEditPage && updateContact(props.contactId, updatedContact.value);

  setTimeout(() => {
    isSaving.value = false;
  }, 1000);
};

/** Подсветить все невалидные поля */
const highlightInvalidFields = () => {
  for (const [inputName, errorText] of Object.entries(form.errors)) {
    if (errorText !== '') {
      form.errorDisplays[inputName] = true;
    }
  }
};

/** Обработать клик по кнопке сохранения */
const handleSaveButtonClick = () => {
  const isValidForm = form.checkValidity();

  if (isValidForm) {
    saveContact();
  }

  if (not(isValidForm)) {
    highlightInvalidFields();
  }
};

/** Обработать клик по кнопке удаления */
const handleRemoveButtonClick = () => {
  isRemoving.value = true;

  removeContact(props.contactId);

  setTimeout(() => {
    isRemoving.value = false;
  }, 1000);
};
</script>

<template>
  <form class="contact-form">
    <h2 class="contact-form__title">{{ title }}</h2>
    <ul class="contact-form__control-list">
      <li v-for="(field, index) in displayedFields" :key="field.name" class="contact-form__item">
        <label :for="field.name" class="contact-form__label">{{ field.labelText }}</label>
        <BaseInput
          v-if="index <= 2"
          :id="field.name"
          :name="field.name"
          :type="field.type"
          v-model="form.values[field.name]"
          :error-text="form.errors[field.name]"
          :is-error-shown="form.errorDisplays[field.name]"
          :placeholder="field.placeholder"
          class="contact-form__input"
          @input-click="handleInputClick"
        />
        <BaseDropdown
          v-if="index === 3"
          :id="field.name"
          :name="field.name"
          v-model="form.values[field.name]"
          :error-text="form.errors[field.name]"
          :is-error-shown="form.errorDisplays[field.name]"
          :options="CATEGORY_OPTIONS"
          :current-option="form.values[field.name]"
          class="contact-form__dropdown"
        />
        <span v-if="index === 4 && isEditPage" class="contact-form__text">{{
          removeTime(props.contact?.created)
        }}</span>
      </li>
    </ul>
    <ul :class="buttonsClass">
      <li>
        <BaseButton
          type="submit"
          class="contact-form__save-button"
          @button-click="handleSaveButtonClick"
        >
          <BaseIcon :icon-name="saveIconName" />
          СОХРАНИТЬ
        </BaseButton>
      </li>
      <li v-if="isEditPage">
        <BaseButton class="contact-form__remove-button" @button-click="handleRemoveButtonClick">
          <BaseIcon
            class="contact-form__remove-icon"
            :icon-name="removeIconName"
            :is-rotated="isRemoving"
          />
          Удалить контакт
        </BaseButton>
      </li>
    </ul>
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
    color: #545454;
    font-size: 12px;

    @media screen and (min-width: 576px) {
      column-gap: 32px;
    }

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }
  }

  &__label {
    width: 72px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 576px) {
      width: 136px;
    }
  }

  &__dropdown {
    font-weight: 400;
  }

  &__text {
    padding: 8px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-start;
    column-gap: 23px;
    flex-flow: row nowrap;
    margin: 0;
    margin-top: 32px;
    margin-left: 84px;
    padding: 0;
    list-style-type: none;

    @media screen and (min-width: 576px) {
      margin-left: 168px;
    }

    &--with-remove {
      justify-content: center;
      margin-left: 0;

      @media screen and (min-width: 576px) {
        justify-content: flex-start;
        margin-left: 168px;
      }
    }
  }

  &__save-button {
    width: 124px;
    background-color: #ffc700;
    font-size: 12px;
    font-weight: 700;

    @media screen and (min-width: 992px) {
      width: 136px;
      height: 40px;
      font-size: 14px;
    }

    &:hover {
      background-color: #ffd84c;
    }
  }

  &__remove-button {
    column-gap: 2px;
    padding: 0;
    color: #2f80ed;
    font-size: 12px;
    font-weight: 400;

    @media screen and (min-width: 992px) {
      height: 40px;
    }

    &:hover {
      color: #529cff;

      .contact-form__remove-icon {
        fill: #529cff;
      }
    }
  }

  &__remove-icon {
    width: 12px;
    height: 12px;
    fill: #2f80ed;
  }
}
</style>
