<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** Тип кнопки */
  type?: 'submit' | 'button' | 'reset';
}

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
</script>

<template>
  <button :type="type" class="button">
    <slot>Нажать</slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  width: fit-content;
  min-height: 32px;
  padding: 0 15px;
  cursor: pointer;
  text-align: center;
  text-transform: inherit;
  color: #545454;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  background-color: #ffffff;
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  &:hover {
    background-color: #ffffff;
  }
}
</style>
