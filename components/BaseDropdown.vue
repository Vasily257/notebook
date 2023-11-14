<script setup lang="ts">
import useDropdown from '@/composable/dropdown';

/** Пропсы компонента */
interface Props {
  /** Значения внутри выпадающего меню */
  options: string[];
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
});

const { isMenuOpened, currentOption, toggleMenu, chooseOption } = useDropdown(props.options);

/** CSS-классы для основной кнопки меню */
const mainButtonClassObject = computed(() => {
  return {
    'dropdown__main-button': true,
    'dropdown__main-button--opened': isMenuOpened.value,
  };
});
</script>

<template>
  <div class="dropdown">
    <BaseButton
      :class="mainButtonClassObject"
      :aria-haspopup="true"
      :aria-expanded="isMenuOpened"
      @click="toggleMenu"
    >
      {{ currentOption }}
      <BaseIcon icon-name="triangle-down" />
    </BaseButton>
    <ul v-if="isMenuOpened" class="dropdown__menu" role="menu">
      <li v-for="(option, index) in options" :key="index" class="dropdown__menu-item">
        <BaseButton class="dropdown__item-button" role="menuitem" @click="chooseOption">
          {{ option }}
          <BaseIcon v-if="option === currentOption" icon-name="check-mark" />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  text-transform: inherit;

  &__main-button {
    column-gap: 8px;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    border-color: #dddddd;

    &:hover {
      border-color: #2f80ed;
    }

    &--opened {
      border-color: #2f80ed;
    }
  }

  &__menu {
    position: absolute;
    z-index: 1;
    top: calc(100% + 8px);
    left: 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 rgba(148, 181, 225, 0.35);
  }

  &__menu-item {
    width: 100%;
  }

  &__item-button {
    width: 100%;
    border: none;

    &:hover {
      background-color: #eaf2fd;
    }
  }
}
</style>
