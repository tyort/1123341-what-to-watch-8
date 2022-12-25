import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosError, AxiosInstance} from 'axios';
import { Film } from '../types/film';
import { loadMovies, showErrorMessage } from './action';
import { errorResponses } from '../utils';

// т.е. мы можем вызывать как fetchMoviesAction(), так и fetchMoviesAction({genre: 'porn'}).
// Причем при вызове fetchMoviesAction() без аргументов, в arg попадает пустой объект({}).
// ЧТО ИНТЕРЕСНО! arg - это одновременно и {}, и undefined
type Arguments = {
  genre: string;
  moviesCount: number;
};

export const fetchMoviesAction = createAsyncThunk<void, Arguments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadingData/fetchMovies',
  async (arg: Arguments, {dispatch, extra: api}) => {
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
    }
  },
);
