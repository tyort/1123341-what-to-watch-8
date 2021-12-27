import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {changeGenre, increaseMoviesCount, loadMovies, loadDataUser, setAuthStatus, failPostComment,
  redirectToRoute, loadComments, loadPromo, defaultMoviesCount, loadSimilar} from '../store/actions-functions';
import { State } from './state';

export enum ActionName {
  ChangeGenre = 'movies/changeGenre',
  IncreaseCount = 'movies/increaseCount',
  LoadMovies = 'movies/loadMovies',
  LoadComments = 'movies/loadComments',
  SetAuthStatus = 'user/setAuthStatus',
  RedirectToRoute = 'app/redirectToRoute',
  LoadDataUser = 'user/loadDataUser',
  LoadPromo = 'movies/loadPromo',
  DefaultMoviesCount = 'movies/defaultMoviesCount',
  LoadSimilar = 'currentMovie/loadSimilar',
  FailPostComment = 'currentMovie/failPostComment',
}

// ReturnType - получить тип, который возвращает функция. Лучше чем просто "typeof функция".
// typeof - получить тип результата вызова функции, а не самой функции.
export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof increaseMoviesCount>
  | ReturnType<typeof loadMovies>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadDataUser>
  | ReturnType<typeof loadPromo>
  | ReturnType<typeof defaultMoviesCount>
  | ReturnType<typeof loadSimilar>
  | ReturnType<typeof failPostComment>

// R - это тип для возвращаемого значения в типе ThunkActionResult (по умолчанию Promise<void>),
// Единственный тип(дженерик), который мы будем передавать для конкретной функции в api-actions-functions при использовании ThunkActionResult;
// А остальные дженерики для ThunkActionResult определим здесь: State, AxiosInstance, Actions;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


