<script setup lang="ts">
/** Типы пропсов */
interface Props {
  /** Название иконки */
  iconName?: string;
  /** Должна ли вращаться иконка */
  isRotated?: boolean;
  /** Текст для скринридера */
  ariaLabel?: string;
  /** Скрыть ли кнопку от скринридера */
  ariaHidden?: boolean;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  iconName: 'save',
  isRotated: false,
  ariaHidden: true,
});

/** CSS-классы для иконки */
const iconClass = computed(() => {
  return {
    'icon': true,
    'icon--rotated': props.isRotated,
  };
});
</script>

<template>
  <svg :class="iconClass" :aria-label="ariaLabel" :aria-hidden="ariaHidden" role="img">
    <use :xlink:href="`sprite.svg#${iconName}`" />
  </svg>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
  min-height: 16px;

  &--rotated {
    animation: rotate 1s infinite ease-in-out;
  }
}
</style>
