<script setup lang="ts">
/** Типы пропсов */
interface Props {
  /** Открыто ли модальное окно */
  isOpened?: boolean;
  /** Текст внутри модального окна */
  text?: string;
  /** Должно ли окно самостоятельно закрываться */
  isSelfClosing?: boolean;
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  text: '',
});

/** Эмиты */
const emits = defineEmits(['closeModal']);

/** Время показа модального окна */
const SHOW_TIME = 2000;

watchEffect(() => {
  if (props.isOpened && props.isSelfClosing) {
    setTimeout(() => {
      emits('closeModal');
    }, SHOW_TIME);
  }
});
</script>

<template>
  <Transition>
    <div v-if="isOpened" class="modal">
      <BaseIcon icon-name="check-mark-in-circle" class="modal__icon" />
      <span class="modal__text"> {{ text }}</span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  top: 64px;
  left: 50%;
  display: flex;
  align-items: center;
  column-gap: 4px;
  flex-flow: row nowrap;
  max-width: 80%;
  min-height: 44px;
  padding: 14px 16px;
  transform: translate(-50%, 0);
  border-radius: 22px;
  background-color: #545454;
  box-shadow: 0 0 20px 0 rgba(176, 197, 222, 0.5);

  @media screen and (min-width: 768px) {
    top: auto;
    bottom: 48px;
    left: 32px;
    padding: 12px 12px 12px 8px;
    transform: translate(0, 0);
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 16px 0 rgba(176, 197, 222, 0.5);
  }

  &__text {
    width: max-content;
    color: #ffffff;
    font-size: 12px;
    line-height: 16px;

    @media screen and (min-width: 768px) {
      color: #545454;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
