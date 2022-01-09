import { AuthorizationStatus } from '../const';
import {ActionName} from '../types/action';
import { Movie } from '../types/movie';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/user';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction(
  ActionName.ChangeGenre,
  (genre: string) => ({payload: genre}),
);

// increaseMoviesCount - функция(создатель действия)
// Особенность: increaseMoviesCount.toString() === 'movies/increaseCount'
export const increaseMoviesCount = createAction(ActionName.IncreaseCount);

export const defaultMoviesCount = createAction(ActionName.DefaultMoviesCount);

export const loadMovies = createAction(
  ActionName.LoadMovies,
  (movies: Movie[]) => ({
    payload: movies,
    // currentTime: new Date().getTime(), --> новое поле, просто как пример.
  }),
);

export const loadFavorites = createAction(
  ActionName.LoadFavorites,
  (movies: Movie[]) => ({payload: movies}),
);

export const loadSimilar = createAction(
  ActionName.LoadSimilar,
  (movies: Movie[]) => ({payload: movies}),
);

export const loadPromo = createAction(
  ActionName.LoadPromo,
  (movie: Movie) => ({payload: movie}),
);

export const loadComments = createAction(
  ActionName.LoadComments,
  (comments: Comment[]) => ({payload: comments}),
);

export const setAuthStatus = createAction(
  ActionName.SetAuthStatus,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

export const loadDataUser = createAction(
  ActionName.LoadDataUser,
  (userData: AuthInfo | null) => ({payload: userData}),
);

export const failPostComment = createAction(
  ActionName.FailPostComment,
  (isFailed: boolean) => ({payload: isFailed}),
);

// Это действие для middleware, там мы его связываем с объектом "history";
export const redirectToRoute = createAction(
  ActionName.RedirectToRoute,
  (url: string) => ({payload: url}),
);
