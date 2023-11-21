<script setup lang="ts">
/** Пропсы компонента */
interface Props {
  /** Есть ли кнопка удаления */
  hasRemoveButton?: boolean;
}

/** Пропсы со значениями по умолчанию */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  hasRemoveButton: false,
});

/** CSS-классы для текста */
const contactFormButtonsClass = computed(() => {
  return {
    'contact-form-buttons': true,
    'contact-form-buttons--with-remove': props.hasRemoveButton,
  };
});
</script>

<template>
  <ul :class="contactFormButtonsClass">
    <li>
      <BaseButton type="submit" class="contact-form-buttons__save-button">
        <BaseIcon icon-name="save" />
        СОХРАНИТЬ
      </BaseButton>
    </li>
    <li v-if="hasRemoveButton">
      <BaseButton class="contact-form-buttons__remove-button">
        <BaseIcon class="contact-form-buttons__remove-icon" icon-name="remove" />
        Удалить контакт
      </BaseButton>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.contact-form-buttons {
  display: flex;
  justify-content: flex-start;
  column-gap: 23px;
  flex-flow: row nowrap;
  margin: 0;
  margin-top: 32px;
  margin-left: 84px;
  padding: 0;
  list-style-type: none;

  @media screen and (min-width: 576px) {
    margin-left: 168px;
  }

  &--with-remove {
    justify-content: center;
    margin-left: 0;

    @media screen and (min-width: 576px) {
      justify-content: flex-start;
      margin-left: 168px;
    }
  }

  &__save-button {
    width: 124px;
    background-color: #ffc700;
    font-size: 12px;
    font-weight: 700;

    @media screen and (min-width: 992px) {
      width: 136px;
      height: 40px;
      font-size: 14px;
    }

    &:hover {
      background-color: #ffd84c;
    }
  }

  &__remove-button {
    column-gap: 2px;
    padding: 0;
    color: #2f80ed;
    font-size: 12px;
    font-weight: 400;

    @media screen and (min-width: 992px) {
      height: 40px;
    }

    &:hover {
      color: #529cff;

      .contact-form-buttons__remove-icon {
        fill: #529cff;
      }
    }
  }

  &__remove-icon {
    width: 12px;
    height: 12px;
    fill: #2f80ed;
  }
}
</style>
