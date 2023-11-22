import * as Yup from 'yup';
import type { FormFieldOptionsRules } from '@/types/form';

/**
 * Получить схему валидации поля
 * @param fieldOptions параметры поля
 */
export default function getValidationSchema({
  name,
  rules,
}: {
  name: string;
  rules: FormFieldOptionsRules;
}) {
  let schema = Yup.string();

  if (rules?.minLength && name === 'name') {
    schema = schema?.min(rules.minLength, 'Слишком короткое имя');
  }

  if (name === 'email') {
    schema = schema?.email('Некорректный e-mail');
  }

  if (rules?.length && name === 'tel') {
    schema = schema?.length(rules.length, 'Некорректный номер');
  }

  if (rules?.required) {
    schema = schema?.required('Поле не может быть пустым');
  }

  return schema;
}
