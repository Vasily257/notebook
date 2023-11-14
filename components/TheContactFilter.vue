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
  text-transform: uppercase;
  border: 1px solid #eaf2fd;
  background: #f9fcff;

  &__dropdown {
    width: 219px;
    height: 32px;
    text-transform: inherit;
  }

  &__button {
    color: #2f80ed;
    border-color: #2f80ed;
    border-radius: 16px;

    @media screen and (min-width: 900px) {
      border-radius: 20px;
    }

    &:hover {
      background-color: #eaf2fd;
    }
  }
}
</style>
