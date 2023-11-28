import * as Yup from 'yup';
import type { FormFieldOptionsRules } from '~/types/form';
import { ContactCategory } from '~/types/contact';

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

  if (rules?.required) {
    schema = schema?.required('Поле не может быть пустым');
  }

  if (rules?.minLength && name === 'name') {
    schema = schema?.trim().min(rules.minLength, 'Слишком короткое имя');
  }

  if (rules?.length && name === 'tel') {
    schema = schema?.length(rules.length, 'Некорректный номер');
  }

  if (name === 'email') {
    schema = schema?.email('Некорректный e-mail');
  }

  if (name === 'category') {
    schema = schema?.notOneOf([ContactCategory.NotSelected], 'Поле не может быть пустым');
  }

  return schema;
}
