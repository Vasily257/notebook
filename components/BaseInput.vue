<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** ID поля */
  id: string;
  /** Имя поля */
  name: string;
  /** Значение поля */
  modelValue: string;
  /** Тип поля */
  type?: string;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['update:modelValue', 'inFocus', 'outFocus']);
</script>

<template>
  <input
    :id="id"
    :name="name"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :pattern="pattern"
    :required="isRequired"
    class="input"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @focusin="$emit('inFocus', $event as Event)"
    @focusout="$emit('outFocus', $event as Event)"
  />
</template>

<style lang="scss" scoped>
.input {
  flex-grow: 1;
  height: 100%;
  padding: 0 8px;
  color: #545454;
  border-width: 1px;
  border-style: solid;
  border-color: #dddddd;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 12px;
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
}
</style>
