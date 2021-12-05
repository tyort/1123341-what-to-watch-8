import {ActionName, ChangeGenreAction} from '../types/action';

// Функция возращает объект(действие)
export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionName.ChangeGenre,
  payload: genre,
});
