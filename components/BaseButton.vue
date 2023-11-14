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
  <button class="button">
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
  height: 32px;
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
  font-size: 12px;
  font-weight: 700;
  line-height: 1;

  &:hover {
    background-color: #ffffff;
  }

  @media screen and (min-width: 900px) {
    height: 40px;
    font-size: 14px;
  }
}
</style>
