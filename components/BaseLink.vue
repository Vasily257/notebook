<script setup lang="ts">
/** Типы пропсов */
interface Props {
  /** Адрес, по которому нужно перейти */
  to?: string;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  to: '/',
});
</script>

<template>
  <NuxtLink :to="to" class="link">
    <slot></slot>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: inherit;
  border-radius: 2px;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #2f80ed;
    outline-offset: 2px;
  }
}
</style>
