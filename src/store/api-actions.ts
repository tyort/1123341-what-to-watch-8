import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { Film } from '../types/film';
import { AppDispatch, State } from '../types/state';
import { errorResponses } from '../utils';
import { hideErrorMessage, loadMovies, showErrorMessage, setAuthorizationStatus } from './action';

// т.е. мы можем вызывать как fetchMoviesAction(), так и fetchMoviesAction({genre: 'porn'}).
// Причем при вызове fetchMoviesAction() без аргументов, в arg попадает пустой объект({}).
// ЧТО ИНТЕРЕСНО! arg - это одновременно и {}, и undefined
type FetchMoviesArguments = {
  genre: string;
  moviesCount: number;
}

type FetchUserArguments = {
  email: string;
  password: string;
};

export const fetchAuthAction = createAsyncThunk(
  'userData/fetchUserAuth',
  async ({email, password}: FetchUserArguments, {dispatch, extra: api}): Promise<void> => {
    try {
      const {data} = await (api as AxiosInstance).get<'AUTH'>('/login', {params: {email, password}});
      dispatch(setAuthorizationStatus(data));

    } catch (err) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      dispatch(showErrorMessage(errorResponses.get((err as AxiosError).response?.data as string)));

      const errorTime = setTimeout(() => {
        dispatch(hideErrorMessage());
        clearTimeout(errorTime);
      }, 5000);
    }
  }
);

export const fetchMoviesAction = createAsyncThunk<void, FetchMoviesArguments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadingData/fetchMovies',
  async (arg: FetchMoviesArguments, {dispatch, extra: api}) => {
    try {
      // http://localhost:3002/films?genre=All+genres&moviesCount=4 - вот как примерно выглядит запрос на бэкэнд
      const response = await api.get<{
        moviesForView: Film[];
        genres: string[];
        showButton: boolean;
      }>('/films', {params: arg});

      // На бэкэнде мы настроили ответ пользователю вот так: res.json(films) - здесь films попадает в data;
      const {data} = response;
      dispatch(loadMovies({...data, ...arg}));

    } catch (err) {
      dispatch(showErrorMessage(errorResponses.get((err as AxiosError).message)));

      const errorTime = setTimeout(() => {
        dispatch(hideErrorMessage());
        clearTimeout(errorTime);
      }, 5000);
    }
  },
);
