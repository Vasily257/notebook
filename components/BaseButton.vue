<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** Тип кнопки */
  type?: 'submit' | 'button' | 'reset';
  /** Отображается ли лоадер */
  isLoading?: boolean;
  /** Отключена ли кнопка */
  isDisabled?: boolean;
}

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  isLoading: false,
  isDisabled: false,
});
</script>

<template>
  <button class="base-button">
    <slot>Нажать</slot>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  max-width: 136px;
  height: 40px;
  padding: 12px 16px;
  cursor: pointer;
  text-align: center;
  color: #545454;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #ffc700;
  font: inherit;
  font-family: 'Proxima Nova';
  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  &:hover {
    background-color: #ffd84c;
  }
}
</style>
