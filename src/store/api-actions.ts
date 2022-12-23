import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import { Film } from '../types/film';
import { loadMovies } from './action';

// Тип для параметра "arg"
type Arguments = {
  genre: string;
}

// В "arg" попадают аргументы при вызове fetchMoviesAction(аргументы)
export const fetchMoviesAction = createAsyncThunk<void, Arguments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadingData/fetchMovies',
  async (arg, {dispatch, extra: api}) => {
    // http://localhost:3002/films?genre=All+genres - вот как выглядит запрос на бэкэнд
    const response = await api.get<Film[]>('/films/2', {params: arg});
    // На бэкэнде мы настроили ответ вот так: res.json(films) - films попадает в data;
    const {data} = response;
    // Диспатчим обычное действие(как объект)
    dispatch(loadMovies(data));
  },
);
