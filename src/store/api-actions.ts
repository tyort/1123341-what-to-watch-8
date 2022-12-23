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
    // res.json(films) - "films" попадает в "data"
    const {data} = await api.get<Film[]>('/films');
    // Диспатчим обычное действие(как объект)
    dispatch(loadMovies(data));
  },
);
