import { ref } from 'vue';
import getValidationSchema from '@/utils/getValidationSchema';
import type { FormFieldOptions } from '@/types/form';
import { ValidationError } from 'yup';

/**
 * Хук для управления отдельного поля формы
 * @param fieldOptions настройки поля формы
 */
export default function useField(fieldOptions: FormFieldOptions) {
  /** Значения полей формы */
  const fieldValue = ref(fieldOptions.value);

  /** Значения ошибок у полей формы */
  const fieldError = ref('');

  // Проверить поле и обновить текст ошибки
  if (fieldOptions?.rules) {
    const schema = getValidationSchema(fieldOptions);

    try {
      schema.validateSync(fieldOptions.value, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        fieldError.value = err.errors[0];
      }
    }
  }

  return {
    fieldValue,
    fieldError,
  };
}
