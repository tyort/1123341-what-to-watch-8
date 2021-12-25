import { AuthorizationStatus } from '../const';
import {ActionName} from '../types/action';
import { Movie } from '../types/movie';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/user';

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

export const defaultMoviesCount = () => ({
  type: ActionName.DefaultMoviesCount,
} as const);

export const loadMovies = (movies: Movie[]) => ({
  type: ActionName.LoadMovies,
  payload: movies,
} as const);

export const loadSimilar = (movies: Movie[]) => ({
  type: ActionName.LoadSimilar,
  payload: movies,
} as const);

export const loadPromo = (movie: Movie) => ({
  type: ActionName.LoadPromo,
  payload: movie,
} as const);

export const loadComments = (comments: Comment[]) => ({
  type: ActionName.LoadComments,
  payload: comments,
} as const);

export const setAuthStatus = (authStatus: AuthorizationStatus) => ({
  type: ActionName.SetAuthStatus,
  payload: authStatus,
} as const);

export const loadDataUser = (userData: AuthInfo | null) => ({
  type: ActionName.LoadDataUser,
  payload: userData,
} as const);

// Это действие для middleware, там мы его связываем с объектом "history";
export const redirectToRoute = (url: string) => ({
  type: ActionName.RedirectToRoute,
  payload: url,
} as const);

