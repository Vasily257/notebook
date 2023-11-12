<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** Название иконки */
  iconName?: string;
  /** Текст для скринридера */
  ariaLabel?: string;
  /** Скрыть ли кнопку от скринридера */
  ariaHidden?: boolean;
  /** Ширина */
  width?: number;
  /** Высота */
  height?: number;
  /** Должна ли вращаться иконка */
  isRotated?: boolean;
}

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  width: 16,
  height: 16,
  iconName: 'save',
  isRotated: false,
  ariaLabel: '',
});

/** CSS-классы для иконки */
const iconClassObject = computed(() => {
  return {
    'base-icon': true,
    'base-icon--is-rotated': props.isRotated,
  };
});
</script>

<template>
  <span :class="iconClassObject">
    <svg
      :width="width"
      :height="height"
      :aria-hidden="ariaHidden"
      :aria-label="ariaLabel"
      role="img"
      :focusable="0"
    >
      <use :xlink:href="`sprite.svg#${iconName}`" />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.base-icon {
  display: flex;
  align-items: center;

  &--is-rotated {
    animation: rotate 1s infinite ease-in-out;
  }
}

</style>
