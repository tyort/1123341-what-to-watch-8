import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Movie } from '../types/movie';
import { loadMovies } from './actions-functions';

export const fetchMoviesAction = (): ThunkActionResult =>
  // api - сконфигурированный экземпляр axios (а также extraArgument)
  // thunk - это middleware(функция). Применяем, чтобы получить доступ к параметрам (dispatch, _getState, api)
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
  };
