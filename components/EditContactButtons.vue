<script setup lang="ts"></script>

<template>
  <ul class="edit-contact-buttons">
    <li class="edit-contact-buttons__item">
      <BaseButton class="edit-contact-buttons__save-button">
        <BaseIcon icon-name="save" />
        СОХРАНИТЬ
      </BaseButton>
    </li>
    <li class="edit-contact-buttons__item">
      <BaseButton class="edit-contact-buttons__remove-button">
        <BaseIcon
          class="edit-contact-buttons__remove-icon"
          icon-name="remove"
          :width="12"
          :height="12"
        />
        Удалить контакт
      </BaseButton>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.edit-contact-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__save-button {
    background-color: #ffc700;

    &:hover {
      background-color: #ffd84c;
    }
  }

  &__remove-button {
    padding: 0;
    color: #2f80ed;
    font-weight: 400;

    &:hover {
      color: #529cff;

      .edit-contact-buttons__remove-icon {
        fill: #529cff;
      }
    }
  }

  &__remove-icon {
    fill: #2f80ed;
  }
}
</style>
