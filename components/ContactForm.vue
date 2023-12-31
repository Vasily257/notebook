<script setup lang="ts">
import useForm from '~/composables/form';
import { getShortTel, getFullTel } from '~/utils/formatTel';
import { getNow, removeTime } from '~/utils/formatDate';
import not from '~/utils/not';
import { PHONE_MASK } from '~/constants';
import { ContactCategory, type Contact } from '~/types/contact';
import { ModalTypes, type Modals } from '~/types/modal';

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
  /** Список модальных окон */
  modals?: Modals;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  isNewPage: false,
  isEditPage: false,
  contactId: '',
  contact: () => ({} as Contact),
  modals: () => ({} as Modals),
});

/** Эмиты */
const emits = defineEmits([
  'addContact',
  'updateContact',
  'removeContact',
  'showModal',
  'goToHomePage',
]);

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
  { name: 'tel', type: 'tel', labelText: 'Телефон', placeholder: PHONE_MASK },
  {
    name: 'email',
    type: 'email',
    labelText: 'E-mail',
    placeholder: 'Например «pochta@domain.ru»...',
  },
  { name: 'category', labelText: 'Категория', placeholder: ContactCategory.NotSelected },
  { name: 'created', labelText: 'Создан' },
];

/** Варианты категорий */
const CATEGORY_OPTIONS = [ContactCategory.Relatives, ContactCategory.Colleagues];

/** Отформатированный номер телефона */
const formattedTel = computed(() => {
  return props.contact?.tel ? getFullTel(props.contact?.tel) : '';
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
    value: props.contact?.category || ContactCategory.NotSelected,
    rules: {
      required: true,
    },
  },
];

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
  return isSaving.value || isUpdating.value ? 'wait' : 'save';
});

/** Название иконки для иконки удаления */
const removeIconName = computed(() => {
  return isRemoving.value ? 'wait' : 'remove';
});

/** Контакт с новыми данными */
const newContact = computed(() => ({
  name: form.values.name,
  tel: getShortTel(form.values.tel),
  email: form.values.email,
  category: form.values.category as ContactCategory,
  created: isSaving ? getNow() : '',
}));

/**
 * Скрыть ошибку
 * @param event событие фокуса
 */
const hideError = (event: FocusEvent) => {
  if (event.target instanceof HTMLInputElement) {
    form.hideError(event.target.name);
  }
};

/** Сохранить (обновить) контакт */
const saveContact = () => {
  isSaving.value = true;

  setTimeout(() => {
    isSaving.value = false;

    if (props.isNewPage) {
      emits('showModal', { type: ModalTypes.contact, text: 'Контакт успешно создан' });
      emits('addContact', newContact.value);
    }

    if (props.isEditPage) {
      emits('showModal', { type: ModalTypes.contact, text: 'Контакт успешно изменён' });
      emits('updateContact', props.contactId, newContact.value);
    }
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

  setTimeout(() => {
    isRemoving.value = false;

    emits('showModal', { type: ModalTypes.contact, text: 'Контакт удалён' });
    emits('removeContact', props.contactId);
    emits('goToHomePage');
  }, 1000);
};
</script>

<template>
  <form class="contact-form">
    <h2 class="contact-form__title">{{ title }}</h2>

    <!-- Поля ввода -->
    <ul class="contact-form__control-list">
      <li v-for="(field, index) in displayedFields" :key="field.name" class="contact-form__item">
        <label v-if="index <= 3" :for="field.name" class="contact-form__label">
          {{ field.labelText }}</label
        >
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
          @custom-focus-in="hideError"
        />
        <BaseDropdown
          v-if="index === 3"
          :id="field.name"
          :name="field.name"
          v-model="form.values[field.name]"
          :error-text="form.errors[field.name]"
          :is-error-shown="form.errorDisplays[field.name]"
          :placeholder="field.placeholder"
          :options="CATEGORY_OPTIONS"
          class="contact-form__dropdown"
          @principal-button-focus-in="hideError"
        />
        <span v-if="index === 4 && isEditPage" class="contact-form__label">
          {{ field.labelText }}</span
        >
        <span v-if="index === 4 && isEditPage" :id="field.name" class="contact-form__text">
          {{ removeTime(props.contact?.created) }}</span
        >
      </li>
    </ul>

    <!-- Кнопки управления -->
    <ul :class="buttonsClass">
      <li>
        <BaseButton
          type="submit"
          class="contact-form__save-button"
          @button-click="handleSaveButtonClick"
        >
          <BaseIcon
            :icon-name="saveIconName"
            :is-rotated="isSaving || isUpdating"
            class="contact-form__save-icon"
          />
          СОХРАНИТЬ
        </BaseButton>
      </li>
      <li v-if="isEditPage">
        <BaseButton class="contact-form__remove-button" @button-click="handleRemoveButtonClick">
          <BaseIcon
            :icon-name="removeIconName"
            :is-rotated="isRemoving"
            class="contact-form__remove-icon"
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
    min-height: 40px;
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

  &__input {
    min-height: 40px;
  }

  &__dropdown {
    min-height: 40px;
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

  &__save-icon {
    fill: #545454;
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
