<script setup lang="ts">
import { handleTelInput, handleTelFocusOut, handleTelFocusIn } from '~/services/input.jsx';

/** Пропсы компонента */
interface Props {
  /** ID поля */
  id: string;
  /** Имя поля */
  name: string;
  /** Тип поля */
  type?: string;
  /** Значение поля */
  modelValue: string;
  /** Текст ошибки */
  errorText?: string;
  /** Показать ли ошибки */
  isErrorShown?: boolean;
  /** Замещающий текст */
  placeholder?: string;
  /** Тип автозаполнения */
  autocomplete?: string;
  /** Разрешенные символы */
  pattern?: string;
  /** Обязательно ли заполнять поле */
  isRequired?: boolean;
}

/** Пропсы */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();

/** Эмиты */
const emits = defineEmits(['update:modelValue', 'inputClick']);

/** CSS-классы для поля ввода */
const fieldClass = computed(() => {
  return {
    'input__field': true,
    'input__field--error': props.isErrorShown,
  };
});

/** Обработать клик */
const handleInputClick = (event: Event) => {
  emits('inputClick', event);
};

/** Обработать фокусировку */
const handleFocusOut = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === 'tel') {
    handleTelFocusOut(event);
  }
};

/** Обработать потерю фокуса */
const handleFocusIn = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === 'tel') {
    handleTelFocusIn(event);
  }
};

/** Обработать ввод */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === 'tel') {
    handleTelInput(event);
  }

  emits('update:modelValue', target.value);
};
</script>

<template>
  <div class="input">
    <input
      :id="id"
      :name="name"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :pattern="pattern"
      :required="isRequired"
      :class="fieldClass"
      @click="handleInputClick"
      @input="handleInput"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    />
    <span v-if="props.isErrorShown" class="input__error-text">{{ errorText }}</span>
    <BaseIcon v-if="props.isErrorShown" icon-name="error-info" class="input__error-icon" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;
  flex-grow: 1;
  height: 100%;

  &__field {
    width: 100%;
    height: 100%;
    padding: 0 8px;
    color: #545454;
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd;
    border-radius: 4px;
    background-color: #ffffff;
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

    &::placeholder {
      color: #a9a9a9;
    }

    &--error {
      border-color: #eb5757;

      &:hover {
        border-color: #eb5757;
      }

      &:focus-visible {
        border-color: #eb5757;
        caret-color: #eb5757;
      }

      &::placeholder {
        color: #eb5757;
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

  &__error-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate(0, -50%);
    color: #eb5757;
    font-size: 10px;
    line-height: 1.6;
  }
}
</style>
