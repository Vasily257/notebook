<script setup lang="ts">
import { removeExtraSpaces } from '~/utils/formatText';
import { getTelUsingMask } from '~/utils/formatTel';

/** Типы пропсов */
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

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorText: '',
  isErrorShown: false,
});

/** Эмиты */
const emits = defineEmits(['update:modelValue', 'customFocusIn']);

/** Маска телефонного номера */
const TEL_MAXTRIX = '+7(___)___-__-__';

/** CSS-классы для поля ввода */
const fieldClass = computed(() => {
  return {
    'input__field': true,
    'input__field--error': props.isErrorShown,
  };
});

/**
 * Обработать фокусировку
 * @param event событие фокуса
 */
const handleFocusOut = (event: FocusEvent) => {
  if (event.target instanceof HTMLInputElement && event.target.type === 'tel') {
    const target = event.target;

    if (target.value === TEL_MAXTRIX || target.value === '+7') {
      target.value = '';
    }
  }
};

/**
 * Обработать фокусировку
 * @param event событие фокуса
 */
const handleFocusIn = (event: FocusEvent) => {
  if (props.isErrorShown) {
    emits('customFocusIn', event);
  }

  if (event.target instanceof HTMLInputElement) {
    const target = event.target;

    if (target.type === 'tel' && target.value === '') {
      target.value = TEL_MAXTRIX;

      // Перевести каретку на 3 символ
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = 3;
      });
    }
  }
};

/**
 * Обработать ввод
 * @param event событие ввода
 */
const handleInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const target = event.target;

    if (target.type === 'tel') {
      target.value = getTelUsingMask(target.value);
    }

    emits('update:modelValue', removeExtraSpaces(target.value));
  }
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
  min-height: inherit;

  &__field {
    width: 100%;
    min-height: inherit;
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
