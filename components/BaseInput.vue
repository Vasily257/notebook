<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** ID поля */
  id: string;
  /** Имя поля */
  name: string;
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

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});
</script>

<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :pattern="pattern"
    :required="isRequired"
    class="input"
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