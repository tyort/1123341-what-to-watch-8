import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

// Типизируем оставшиеся параметры. Только числа
export function sum(...someNumbers: number[]) {
  return someNumbers.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
}

// // Ok
// sum(1, 3);

// // ts2345
// sum(1, '1');

export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= 3600 ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(format);
};

export const FILMS_COUNT_DIVIDER = 4;
export const REQUEST_TIMEOUT = 5000;

export const errorResponses = new Map([
  ['Network Error', 'Невозможно установить соединение c сервером!'],
  ['Request failed with status code 404', 'Ты обратился по несуществующему адресу, уебок!'],
  [`timeout of ${REQUEST_TIMEOUT}ms exceeded`, 'Превышено время ожидания ответа от сервера!']
]);
