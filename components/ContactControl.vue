<script setup lang="ts">
import type { ContactLabel } from '@/types/contact.js';

interface Props {
  /** Лейбл */
  label: ContactLabel;
  /** Порядковый номер контрола */
  index: number;
  /** Опции для выпадающего меню */
  categoryOptions: string[];
}

/** Пропсы */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
</script>

<template>
  <BaseControl :control-id="label.name" :label-text="label.text">
    <BaseInput v-if="index < 3" :id="label.name" :name="label.name" />
    <BaseDropdown v-if="index === 3" :options="categoryOptions" />
    <span v-if="index === 4"></span>
  </BaseControl>
</template>

<style lang="scss" scoped></style>
