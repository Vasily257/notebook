import * as Yup from 'yup';
import type { FormFieldOptions } from '@/types/form';

/**
 * Получить схему валидации поля
 * @param fieldOptions параметры поля
 */
export default function getValidationSchema(fieldOptions: FormFieldOptions) {
  let schema = Yup.string();

  const rules = fieldOptions?.rules || {};

  if (rules?.minLength && fieldOptions.name === 'name') {
    schema = schema?.min(rules.minLength, 'Слишком короткое имя');
  }

  if (fieldOptions.name === 'email') {
    schema = schema?.email('Некорректный e-mail');
  }

  if (rules?.length && fieldOptions.name === 'tel') {
    schema = schema?.length(10, 'Некорректный номер');
  }

  if (rules?.required) {
    schema = schema?.required('Поле не может быть пустым');
  }

  return schema;
}
