<script setup lang="ts">
// Важно: главная кнопка — это поле input с типом button.
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
const emits = defineEmits(['update:modelValue', 'principalButtonFocusIn']);

/** Открыто ли выпадающее меню */
const isMenuOpened = ref(false);

/** Элемент главной кнопки */
const principalMenu = ref<HTMLButtonElement | null>(null);

/** Элементы выпадающего меню */
const menuItems = ref<HTMLUListElement[]>([]);

/** Кнопки выпадающего меню */
const menuItemButtons = ref<HTMLButtonElement[]>([]);

/** CSS-классы для главной кнопки */
const principalButtonClass = computed(() => {
  return {
    'dropdown__principal-button': true,
    'dropdown__principal-button--opened': isMenuOpened.value,
    'dropdown__principal-button--error': props.isErrorShown,
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
const principalButtonIconName = computed(() => {
  return props.isErrorShown ? 'error-info' : 'triangle-down';
});

/** Получить класс кнопки меню */
const getItemButtonClass = (index: number) => {
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

/** Обработать фокусировку на главной кнопке */
const handlePrincipalButtonFocusIn = (event: Event) => {
  if (props.isErrorShown) {
    emits('principalButtonFocusIn', event);
  }
};

/** Открыть выпадающее меню */
const openMenu = () => {
  isMenuOpened.value = true;

  // Также фокус перемещается на первую кнопку меню (см. ниже watchEffect)
};

/** Закрыть выпадающее меню */
const closeMenu = () => {
  isMenuOpened.value = false;

  document.removeEventListener('click', closeMenuOnOutsideClick);
};

/** Сфокусироваться на первой кнопке меню */
const focusFirstMenuButton = () => {
  menuItemButtons.value[0]?.focus();
};

/** Переключить видимость выпадающего меню */
const handlePrincipalButtonClick = () => {
  if (isMenuOpened.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

/** Обработать клик по кнопке выпадающего меню */
const handleMenuButtonClick = (event: Event) => {
  if (event.target instanceof HTMLButtonElement) {
    const buttonElement = event.target;

    // Обновить значение выпадающего списка
    if (buttonElement?.textContent) {
      emits('update:modelValue', buttonElement.textContent.trim());
    }
  }

  closeMenu();
};

/** Обработать нажатие клавиши на кнопке выпадающего меню */
const handleMenuButtonKeyInput = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    const currentButton = event.target;
    const currentButtonIndex = menuItemButtons.value.indexOf(currentButton);
    const lastIndex = menuItemButtons.value.length - 1;

    // При нажатии стрелки вверх
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (currentButtonIndex > 0 && currentButtonIndex <= lastIndex) {
        menuItemButtons.value[currentButtonIndex - 1].focus();
      }

      if (currentButtonIndex === 0) {
        menuItemButtons.value[lastIndex].focus();
      }
    }

    // При нажатии стрелки вниз
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (currentButtonIndex >= 0 && currentButtonIndex < lastIndex) {
        menuItemButtons.value[currentButtonIndex + 1].focus();
      }

      if (currentButtonIndex === lastIndex) {
        menuItemButtons.value[0].focus();
      }
    }

    // При нажатии клавиши Escape
    if (event.key === 'Escape') {
      closeMenu();

      if (principalMenu.value) {
        principalMenu.value.focus();
      }
    }

    // При нажатии клавиши Tab
    if (event.key === 'Tab') {
      closeMenu();
    }
  }
};

watchEffect(() => {
  if (isMenuOpened.value) {
    // Очистить старый список кнопок
    menuItemButtons.value = [];

    // Получить новый список кнопок
    menuItems.value.forEach((menuItem) => {
      const menuItemButton = menuItem.querySelector('button');

      if (menuItemButton) {
        menuItemButtons.value.push(menuItemButton);
      }
    });

    focusFirstMenuButton();

    // Добавить обработчик с нулевой задержкой, чтобы он сразу не сработал
    setTimeout(() => {
      document.addEventListener('click', closeMenuOnOutsideClick);
    });
  }
});

// Добавление слушателя события клика на родительский элемент вашего меню или корневой элемент компонента
const closeMenuOnOutsideClick = (event: Event) => {
  const isMenuButton =
    event.target instanceof HTMLButtonElement && menuItemButtons.value.includes(event.target);

  if (!isMenuButton) {
    closeMenu();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenuOnOutsideClick);
});
</script>

<template>
  <div class="dropdown">
    <!-- Главная кнопка -->
    <input
      :id="id"
      ref="principalMenu"
      :name="name"
      :value="modelValue"
      type="button"
      :required="isRequired"
      :class="principalButtonClass"
      :aria-haspopup="true"
      :aria-expanded="isMenuOpened"
      @focusin="handlePrincipalButtonFocusIn"
      @click="handlePrincipalButtonClick"
      @keyup.down="openMenu"
    />
    <BaseIcon :icon-name="principalButtonIconName" class="dropdown__principal-button-icon" />
    <span v-if="props.isErrorShown" class="dropdown__error-text">{{ errorText }}</span>
    <span v-if="isPlaceholderShown" :class="placeholderClass">{{ placeholder }}</span>

    <!-- Скрытое выпадающее меню -->
    <ul v-if="isMenuOpened" class="dropdown__menu" role="menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        ref="menuItems"
        class="dropdown__menu-item"
      >
        <BaseButton
          :class="getItemButtonClass(index)"
          tabindex="-1"
          @click="handleMenuButtonClick"
          @keyup.up="handleMenuButtonKeyInput"
          @keyup.down="handleMenuButtonKeyInput"
          @keyup.esc="handleMenuButtonKeyInput"
          @keydown.tab="handleMenuButtonKeyInput"
          @mouseenter="$event.target.focus()"
        >
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

  &__principal-button {
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

    &--opened {
      border-color: #2f80ed;
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

  &__principal-button-icon {
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

    &:focus {
      border-color: transparent;
      outline: none;
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
