// Типизируем оставшиеся параметры. Только числа
export function sum(...someNumbers: number[]) {
  return someNumbers.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
}

// // Ok
// sum(1, 3);

// // ts2345
// sum(1, '1');
