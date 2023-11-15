<script setup lang="ts">
import { categoryOptions } from '@/constants/index';
import type { EditContactLabel } from '@/types/edit-contact.js';

interface Props {
  /** Лейбл */
  label: EditContactLabel;
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
    <p v-if="index === 5"></p>
  </BaseControl>
</template>

<style lang="scss" scoped></style>
