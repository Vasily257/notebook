<script setup lang="ts">
import type { ContactLabel } from '@/types/contact.js';

/** Варианты категорий */
const categoryOptions = ['Не выбрано', 'Родственники', 'Коллеги'];

interface Props {
  /** Лейбл */
  label: ContactLabel;
  /** Порядковый номер контрола */
  index: number;
}

/** Пропсы */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
</script>

<template>
  <BaseControl :control-id="label.id" :label-text="label.text">
    <BaseInput v-if="index < 3" :id="label.id" :name="label.id" />
    <BaseDropdown v-if="index === 3" :options="categoryOptions" />
    <span v-if="index === 4"></span>
  </BaseControl>
</template>

<style lang="scss" scoped></style>
