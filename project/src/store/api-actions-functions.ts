/* eslint-disable no-console */
import { saveToken } from '../backend/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { Movie } from '../types/movie';
import { Comment } from '../types/comment';
import { AuthInfo, User } from '../types/user';
import { loadComments, loadDataUser, loadMovies, loadPromo, redirectToRoute, setAuthStatus } from './actions-functions';

export const fetchMoviesAction = (): ThunkActionResult =>
  // api - сконфигурированный экземпляр axios (а также extraArgument)
  // thunk - это middleware(функция). Применяем, чтобы получить доступ к параметрам (dispatch, _getState, api)
  async (dispatch, _getState, api): Promise<void> => {
    // Почему то дженерик подходит по типу не для константы, а для свйоства "data"
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(APIRoute.Promo);
    dispatch(loadPromo(data));
  };

export const fetchCommentsAction = (movieId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${movieId}`);
    dispatch(loadComments(data));
  };

export const postCommentAction = (movieId: number, rating: number, comment: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${movieId}`, {rating, comment});
    dispatch(loadComments(data));
    dispatch(redirectToRoute(`${AppRoute.Films}/${movieId}`));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const serverResponse = await api.get(APIRoute.Login);
      dispatch(loadDataUser(serverResponse.data));
      dispatch(setAuthStatus(AuthorizationStatus.Auth));

    } catch(errStatus) {
      // т.к. я прописал в api ...return Promise.reject(response?.status);
      if (errStatus === 401) {
        dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      }
    }
  };

export const loginAction = ({email, password}: User): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    // data аналогично AuthInfo;
    const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(loadDataUser(data));
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete(APIRoute.Logout);
      api.delete(APIRoute.Logout);
      dispatch(loadDataUser(null));
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));

    } catch(errStatus) {
      console.log(errStatus);
    }
  };
