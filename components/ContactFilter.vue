<script setup lang="ts">
import useScreenWidth from '~/composables/screenWidth.js';
import { ContactCategory } from '~/types/contact';

/** Варианты категорий */
const categoryOptions = [
  ContactCategory.All,
  ContactCategory.Relatives,
  ContactCategory.Colleagues,
];

const { isSmall } = useScreenWidth();
</script>

<template>
  <div class="contact-filter">
    <BaseDropdown class="contact-filter__dropdown" :options="categoryOptions" />
    <BaseButton class="contact-filter__button">
      <BaseIcon icon-name="plus" />
      {{ isSmall ? 'Добавить контакт' : 'Добавить' }}
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
  padding: 0 11px;
  text-transform: uppercase;
  border: 1px solid #eaf2fd;
  background: #f9fcff;

  @media screen and (min-width: 768px) {
    padding: 0 31px;
  }

  &__dropdown {
    max-width: 219px;
    height: 32px;
    text-transform: inherit;
    font-size: 14px;

    @media screen and (min-width: 576px) {
      max-width: 235px;
    }
  }

  &__button {
    color: #2f80ed;
    border-color: #2f80ed;
    border-radius: 16px;
    font-size: 12px;

    @media screen and (min-width: 992px) {
      border-radius: 20px;
    }

    &:hover {
      background-color: #eaf2fd;
    }
  }
}
</style>
