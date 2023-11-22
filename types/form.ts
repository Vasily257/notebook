/** Опции с правилами валидации для поля формы */
export interface FormFieldOptionsRules {
  minLength?: number;
  length?: number;
  required?: boolean;
}

/** Опции с настройками поля формы */
export interface FormFieldOptions {
  name: string;
  value: string;
  rules?: FormFieldOptionsRules;
}
