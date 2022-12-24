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
