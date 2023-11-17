/**
 * Получить отформатированный номер телефона
 * @param tel 10-значный номер телефона
 * @returns телефон в формате +7 (123) 456-78-90
 */
export default function formatTel(tel: string): string {
  const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10] = tel;

  return `+7(${d1}${d2}${d3})${d4}${d5}${d6}-${d7}${d8}-${d9}${d10}`;
}
