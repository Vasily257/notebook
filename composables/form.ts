import { toValue, ref, watch } from 'vue';
import useField from '~/composables/field';
import type { FormFieldOptions, Values, Errors } from '@/types/form';

/**
 * Хук для управления формой
 * @param fieldOptions настройки полей формы
 */
export default function useForm(fieldOptions: FormFieldOptions[] = []) {
  /** Нереактивное значение настроек формы */
  const normalizedFieldOptions = toValue(fieldOptions);

  /** Значения полей формы */
  const values = ref<Values>({});

  /** Значения ошибок у полей формы */
  const errors = ref<Errors>({});

  /** Валидна ли форма */
  const isValid = ref(true);

  // Обновить значение и текст ошибок для каждого поля
  for (const fieldOption of normalizedFieldOptions) {
    const { fieldValue, fieldError } = useField(fieldOption);

    Object.assign(values.value, { [fieldOption.name]: fieldValue });
    Object.assign(errors.value, { [fieldOption.name]: fieldError });
  }

  // Определить валидность формы
  watch(
    errors,
    () => {
      isValid.value = Object.values(errors).every((error) => error === '');
    },
    { deep: true, immediate: true },
  );

  return {
    values,
    errors,
    isValid,
  };
}
