import {ActionName, ChangeGenreAction, IncreaseCountAction} from '../types/action';

// Функция возращает объект(действие)
export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionName.ChangeGenre,
  payload: genre,
});

export const increaseMoviesCount = (): IncreaseCountAction => ({
  type: ActionName.IncreaseCount,
});
