import { ref, watch } from 'vue';
import getValidationSchema from '@/utils/getValidationSchema';
import type { FormFieldOptions, Values, Errors } from '@/types/form';
import { ValidationError } from 'yup';

/**
 * Хук для управления формой
 * @param fieldOptions настройки полей формы
 */
export default function useForm(fieldOptions: FormFieldOptions[] = []) {
  /** Значения полей формы */
  const values = ref<Values>({});

  /** Значения ошибок у полей формы */
  const errors = ref<Errors>({});

  /** Валидна ли форма */
  const isValid = ref(false);

  // Присовить начальные значения
  for (const fieldOption of fieldOptions) {
    Object.assign(values.value, { [fieldOption.name]: fieldOption.value });
    Object.assign(errors.value, { [fieldOption.name]: '' });
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

  // Если текста ошибок поменялись, то проверить валидность формы
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
