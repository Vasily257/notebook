<script setup lang="ts">
import { computed } from 'vue';

/** Пропсы компонента */
interface Props {
  /** Тип кнопки */
  type?: 'submit' | 'button' | 'reset';
  /** Текст внутри кнопки */
  text?: string;
  /** Текст для скринридера */
  ariaLabel?: string;
  /** Название иконки */
  iconName?: string;
  /** Используется ли outlined-стиль для кнопки */
  isOutlined?: boolean;
  /** Отображается ли лоадер */
  isLoading?: boolean;
  /** Отключена ли кнопка */
  isDisabled?: boolean;
}

/** Размеры уменьшенной иконки */
const SMALL_ICON_SIZE = {
  width: 12,
  height: 12,
};

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  text: 'Нажать',
  ariaLabel: '',
  iconName: '',
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

/** CSS-классы для текста кнопки */
const buttonTextClassObject = computed(() => {
  return {
    'base-button__text': true,
    'base-button__text--outlined': props.isOutlined,
  };
});

/** Есть ли иконка внутри кнопки */
const hasIcon = computed(() => Boolean(props.iconName));

/** Параметры иконки */
const iconParams = computed(() => ({
  name: props.isLoading ? 'wait' : props.iconName,
  width: props.isOutlined ? SMALL_ICON_SIZE.width : undefined,
  height: props.isOutlined ? SMALL_ICON_SIZE.height : undefined,
  isRotated: props.isLoading,
}));
</script>

<template>
  <button :class="buttonClassObject">
    <BaseIcon
      v-if="hasIcon"
      :icon-name="iconParams.name"
      :width="iconParams.width"
      :height="iconParams.height"
      :is-rotated="iconParams.isRotated"
    />
    <span :class="buttonTextClassObject">{{ text }}</span>
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
  color: inherit;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #ffc700;
  font: inherit;

  &:hover {
    background-color: #ffd84c;
  }

  &--outlined {
    gap: 2px;
    background-color: #ffffff;

    &:hover {
      border: 1px solid #2f80ed;
      background-color: #ffffff;
    }
  }

  &__text {
    text-align: center;
    color: #545454;
    font-family: 'Proxima Nova';
    font-size: 14px;
    font-weight: 700;
    line-height: 1;

    &--outlined {
      color: #2f80ed;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
  }
}

</style>
