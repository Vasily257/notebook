<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** ID связанного контрола */
  controlId: string;
  /** Текста лейбла */
  labelText: string;
  /** Скрыть ли визуально лейбл */
  isHidden?: boolean;
}

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  isHidden: false,
});
</script>

<template>
  <div class="control">
    <label :for="controlId" class="control__label">{{ labelText }}</label>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.control {
  display: flex;
  align-items: center;
  column-gap: 12px;
  flex-flow: row nowrap;
  height: 40px;
  margin: 0;
  padding: 0;

  &__label {
    width: 72px;
    color: #545454;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;

    @media screen and (min-width: 450px) {
      &__label {
        width: 136px;
      }
    }
  }
}
</style>
