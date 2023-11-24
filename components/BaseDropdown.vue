<script setup lang="ts">
import { ref } from 'vue';
import not from '@/utils/not';

// Важно: основная кнопка — это поле input с типом button.
// Это сделано для того, чтобы было проще управлять значением поля.

/** Пропсы компонента */
interface Props {
  /** ID поля */
  id?: string;
  /** Имя поля */
  name?: string;
  /** Значение поля */
  modelValue: string;
  /** Текст ошибки */
  errorText?: string;
  /** Показать ли ошибки */
  isErrorShown?: boolean;
  /** Замещающий текст */
  placeholder?: string;
  /** Обязательно ли заполнять поле */
  isRequired?: boolean;
  /** Значения внутри выпадающего меню */
  options: string[];
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorText: '',
  isErrorShown: false,
  options: () => [],
});

/** Эмиты */
const emits = defineEmits(['update:modelValue', 'dropdownClick']);

/** Открыто ли выпадающее меню */
const isMenuOpened = ref(false);

/** CSS-классы для основной кнопки меню */
const mainButtonClass = computed(() => {
  return {
    'dropdown__main-button': true,
    'dropdown__main-button--opened': isMenuOpened.value,
    'dropdown__main-button--error': props.isErrorShown,
  };
});

/** Показывать ли заменитель текса */
const isPlaceholderShown = computed(() => {
  return props.modelValue === '';
});

/** CSS-классы для заменителя текса */
const placeholderClass = computed(() => {
  return {
    'dropdown__placeholder': true,
    'dropdown__placeholder--error': props.isErrorShown,
  };
});

/** Название иконки главной кнопки */
const mainButtonIconName = computed(() => {
  return props.isErrorShown ? 'error-info' : 'triangle-down';
});

/** Переключить видимость выпадающего меню */
const toggleMenu = () => {
  isMenuOpened.value = not(isMenuOpened.value);
};

const handleDropdownClick = (event: Event) => {
  toggleMenu();

  if (props.isErrorShown) {
    emits('dropdownClick', event);
  }
};

/** Закрыть выпадающее меню */
const closeMenu = () => {
  isMenuOpened.value = false;
};

/** Выбрать новую опцию */
const chooseOption = (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  const buttonElement = eventTarget.closest('button');

  if (buttonElement?.textContent) {
    emits('update:modelValue', buttonElement.textContent.trim());
  }

  closeMenu();
};

/** Получить класс кнопки меню */
const getItemButtonClassObject = (index: number) => {
  return {
    'dropdown__item-button': true,
    'dropdown__item-button--first': index === 0,
    'dropdown__item-button--last': index === props.options.length - 1,
  };
};

/** Является ли перебирамая опция выбранной */
const isCurrentOption = (option: string) => {
  return option === props.modelValue;
};
</script>

<template>
  <div class="dropdown">
    <!-- Основная кнопка -->
    <input
      :id="id"
      :name="name"
      :value="modelValue"
      type="button"
      :required="isRequired"
      :class="mainButtonClass"
      :aria-haspopup="true"
      :aria-expanded="isMenuOpened"
      @click="handleDropdownClick"
    />
    <BaseIcon :icon-name="mainButtonIconName" class="dropdown__main-button-icon" />
    <span v-if="props.isErrorShown" class="dropdown__error-text">{{ errorText }}</span>
    <span v-if="isPlaceholderShown" :class="placeholderClass">{{ placeholder }}</span>

    <!-- Скрытое выпадающее меню -->
    <ul v-if="isMenuOpened" class="dropdown__menu" role="menu">
      <li v-for="(option, index) in options" :key="index" class="dropdown__menu-item">
        <BaseButton :class="getItemButtonClassObject(index)" role="menuitem" @click="chooseOption">
          {{ option }}
          <BaseIcon v-if="isCurrentOption(option)" icon-name="check-mark" />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  text-transform: inherit;
  font-size: inherit;
  font-weight: inherit;

  &__main-button {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    cursor: pointer;
    text-align: left;
    text-transform: inherit;
    color: #545454;
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd;
    border-radius: 4px;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1;

    &:hover {
      border-color: #2f80ed;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: #2f80ed;
      caret-color: #2f80ed;
    }

    &--error {
      color: #eb5757;
      border-color: #eb5757;

      &:hover {
        border-color: #eb5757;
      }

      &:focus-visible {
        border-color: #eb5757;
        caret-color: #eb5757;
      }
    }
  }

  &__error-text {
    position: absolute;
    top: 100%;
    right: 0;
    color: #eb5757;
    font-size: 10px;
    line-height: 1.6;
  }

  &__main-button-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate(0, -50%);
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translate(0, -50%);
    color: #a9a9a9;
    font-size: 12px;

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }

    &--error {
      color: #eb5757;
    }
  }

  &__menu {
    position: absolute;
    z-index: 1;
    top: calc(100% + 8px);
    left: 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 6px 0 rgba(148, 181, 225, 0.35);
    font-weight: 400;
  }

  &__menu-item {
    width: 100%;
  }

  &__item-button {
    width: 100%;
    border: none;
    border-radius: 0;

    &:hover {
      background-color: #eaf2fd;
    }

    &--first {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &--last {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
}

</style>
