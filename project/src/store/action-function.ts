import {ActionName} from '../types/action';

// Функция возращает объект(действие)
export const changeGenre = (genre: string) => ({
  type: ActionName.ChangeGenre,
  payload: genre,
// Объект, который возвращает функция changeGenre, является константой.
// Таким образом мы можем не типизировать возвращаемый результат(объект).
} as const);

export const increaseMoviesCount = () => ({
  type: ActionName.IncreaseCount,
} as const);
