/** Значения полей, индексированные по имени поля */
export type Values = Record<string, string>;

/** Значения ошибок полей, индексированные по имени поля */
export type Errors = Record<string, string>;

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
