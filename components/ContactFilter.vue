<script setup lang="ts">
import { ContactCategory } from '~/types/contact';

/** Пропсы компонента */
interface Props {
  /** Отрисовывается ли компонент на странице с small шириной */
  isSmallPageWidth?: boolean;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  isSmallPageWidth: false,
});

/** Эмиты */
const emits = defineEmits(['updatePageFilter', 'goToNewPage']);

/** Варианты фильтров */
const FILTER_OPTIONS = [ContactCategory.All, ContactCategory.Relatives, ContactCategory.Colleagues];

/** Текущий фильтр */
const currentFilter = ref(ContactCategory.All);

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
    <label for="contact-filter" class="hidden-visually">Фильтр контактов</label>
    <BaseDropdown
      id="contact-filter"
      :options="FILTER_OPTIONS"
      v-model="currentFilter"
      is-filter
      class="contact-filter__dropdown"
    />
    <BaseButton class="contact-filter__button" @button-click="emits('goToNewPage')">
      <BaseIcon icon-name="plus" />
      {{ isSmallPageWidth ? 'Добавить контакт' : 'Добавить' }}
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
    max-width: 58%;
    min-height: 32px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;

    @media screen and (min-width: 376px) {
      max-width: 219px;
    }

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
