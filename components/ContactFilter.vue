<script setup lang="ts">
import useScreenWidth from '~/composables/screenWidth';
import { ContactCategory } from '~/types/contact';

/** Эмиты */
const emits = defineEmits(['updatePageFilter', 'goToNewPage']);

/** Варианты фильтров */
const FILTER_OPTIONS = [ContactCategory.All, ContactCategory.Relatives, ContactCategory.Colleagues];

/** Текущий фильтр */
const currentFilter = ref(ContactCategory.All);

const { isSmall } = useScreenWidth();

// Обновить фильтр на странице, если поменялось значение внутри выпадающего меню
watch(
  currentFilter,
  () => {
    emits('updatePageFilter', currentFilter.value);
  },
  { immediate: true },
);
</script>

<template>
  <div class="contact-filter">
    <BaseDropdown
      :options="FILTER_OPTIONS"
      v-model="currentFilter"
      class="contact-filter__dropdown"
    />
    <BaseButton class="contact-filter__button" @button-click="emits('goToNewPage')">
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
  min-height: 48px;
  padding: 0 11px;
  text-transform: uppercase;
  border: 1px solid #eaf2fd;
  background: #f9fcff;

  @media screen and (min-width: 768px) {
    padding: 0 31px;
  }

  @media screen and (min-width: 992px) {
    min-height: 56px;
  }

  @media screen and (min-width: 992px) {
    justify-content: center;
  }

  @media screen and (min-width: 1054px) {
    column-gap: 580px;
  }

  &__dropdown {
    max-width: 219px;
    min-height: 32px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;

    @media screen and (min-width: 576px) {
      min-width: 235px;
    }

    @media screen and (min-width: 992px) {
      min-height: 40px;
      margin-right: auto;
    }

    @media screen and (min-width: 1054px) {
      margin-right: 0;
    }
  }

  &__button {
    min-width: 117px;
    color: #2f80ed;
    border-color: #2f80ed;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;

    @media screen and (min-width: 576px) {
      min-width: 175px;
    }

    @media screen and (min-width: 992px) {
      border-radius: 20px;
      font-size: 12px;
    }

    &:hover {
      background-color: #eaf2fd;
    }
  }
}
</style>
