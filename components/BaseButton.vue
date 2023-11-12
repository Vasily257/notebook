<script setup lang="ts">
import { computed } from 'vue';

/** Пропсы компонента */
interface Props {
  /** Тип кнопки */
  type?: 'submit' | 'button' | 'reset';
  /** Текст для скринридера */
  ariaLabel?: string;
  /** Используется ли outlined-стиль для кнопки */
  isOutlined?: boolean;
  /** Отображается ли лоадер */
  isLoading?: boolean;
  /** Отключена ли кнопка */
  isDisabled?: boolean;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  ariaLabel: '',
  isOutlined: false,
  isLoading: false,
  isDisabled: false,
});

/** CSS-классы для кнопки */
const buttonClassObject = computed(() => {
  return {
    'base-button': true,
    'base-button--outlined': props.isOutlined,
  };
});
</script>

<template>
  <button :class="buttonClassObject">
    <slot>Нажать</slot>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
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

  &--outlined {
    gap: 2px;
    color: #2f80ed;
    background-color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;

    &:hover {
      border: 1px solid #2f80ed;
      background-color: #ffffff;
    }
  }
}
</style>
