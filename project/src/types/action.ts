import {changeGenre, increaseMoviesCount} from '../store/action-function';

export enum ActionName {
  ChangeGenre = 'movies/changeGenre',
  IncreaseCount = 'movies/increaseCount'
}

export type ChangeGenreAction = {
  type: ActionName.ChangeGenre;
  payload: string;
};

export type IncreaseCountAction = {
  type: ActionName.IncreaseCount;
};

// ReturnType - получить тип, который возвращает функция. Лучше чем просто "typeof функция".
// typeof - получить тип результата вызова функции, а не самой функции.
export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof increaseMoviesCount>

