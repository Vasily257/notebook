import { ref, watch } from 'vue';
import getValidationSchema from '@/utils/getValidationSchema';
import type { FormFieldOptions } from '@/types/form';
import { ValidationError } from 'yup';

/**
 * Хук для управления формой
 * @param fieldOptions настройки полей формы
 */
export default function useForm(fieldOptions: FormFieldOptions[] = []) {
  /** Значения полей формы */
  const values = ref<Record<string, string>>({});

  /** Значения ошибок у полей формы */
  const errors = ref<Record<string, string>>({});

  /** Статусы отображения ошибок у полей формы */
  const errorDisplays = ref<Record<string, boolean>>({});

  /** Валидна ли форма */
  const checkValidity = () => {
    return Object.values(errors.value).every((error) => error === '');
  };

  /** Скрыть ошибку */
  const hideError = (inputName: string) => {
    errorDisplays.value[inputName] = false;
  };

  // Присвоить начальные значения
  for (const fieldOption of fieldOptions) {
    Object.assign(values.value, { [fieldOption.name]: fieldOption.value });
    Object.assign(errors.value, { [fieldOption.name]: '' });
    Object.assign(errorDisplays.value, { [fieldOption.name]: false });
  }

  // Если значения полей поменялись, то провалидировать их
  watch(
    values,
    () => {
      for (const fieldOption of fieldOptions) {
        if (fieldOption?.rules) {
          const schema = getValidationSchema({
            name: fieldOption.name,
            rules: fieldOption.rules,
          });

          try {
            const resultValue = schema.validateSync(values.value[fieldOption.name], {
              abortEarly: false,
            });

            if (resultValue) {
              errors.value[fieldOption.name] = '';
            }
          } catch (err) {
            if (err instanceof ValidationError) {
              errors.value[fieldOption.name] = err.errors[0];
            }
          }
        }
      }
    },
    { deep: true, immediate: true },
  );

  return {
    values,
    errors,
    errorDisplays,
    checkValidity,
    hideError,
  };
}
