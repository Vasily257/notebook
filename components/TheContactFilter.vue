<script setup lang="ts">
const filterOptions = ['все', 'родственники', 'коллеги'];
</script>

<template>
  <div class="contact-filter">
    <BaseDropdown class="contact-filter__dropdown" :options="filterOptions" />
    <BaseButton class="contact-filter__button">
      <BaseIcon icon-name="plus" />
      Добавить
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.contact-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  height: 48px;
  padding: 0 12px;
  border: 1px solid #eaf2fd;
  background: #f9fcff;

  &__dropdown {
    width: 219px;
    height: 32px;
    text-transform: uppercase;
  }

  &__button {
    height: 32px;
    padding: 0 16px;
    text-transform: uppercase;
    color: #2f80ed;
    border: 1px solid #2f80ed;
    border-radius: 16px;
    background-color: #ffffff;
    font-size: 12px;

    &:hover {
      background-color: #eaf2fd;
    }
  }
}
</style>
