/* eslint-disable no-console */
import { saveToken } from '../backend/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { Movie } from '../types/movie';
import { AuthInfo, User } from '../types/user';
import { loadMovies, setAuthStatus } from './actions-functions';

export const fetchMoviesAction = (): ThunkActionResult =>
  // api - сконфигурированный экземпляр axios (а также extraArgument)
  // thunk - это middleware(функция). Применяем, чтобы получить доступ к параметрам (dispatch, _getState, api)
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthStatus(AuthorizationStatus.Auth));

    } catch(errStatus) {
      // т.к. я прописал в api ...return Promise.reject(response?.status);
      if (errStatus === 401) {
        dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      }
    }
  };
