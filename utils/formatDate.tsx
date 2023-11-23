/**
 * Получить отформатированную дату
 * @param dateString дата, полученая с помощью объекта Date
 * @returns дата в формате ДД.ММ.ГГ
 */
export default function formatTel(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}
