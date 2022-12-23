import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import { Film } from '../types/film';
import { loadMovies } from './action';

export const fetchMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadingData/fetchMovies',
  async (_arg, {dispatch, extra: api}) => {
    // c бэкэнда на фронт res.json(films) - "films" попадает в "data"
    const response = await api.get<Film[]>('/films?jopa=123');
    console.log(response);
    const {data} = response;
    // Диспатчим обычное действие(как объект)
    dispatch(loadMovies(data));
  },
);
