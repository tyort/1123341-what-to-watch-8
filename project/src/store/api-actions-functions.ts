/* eslint-disable no-console */
import { saveToken, dropToken } from '../backend/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { Movie } from '../types/movie';
import { Comment } from '../types/comment';
import { AuthInfo, User } from '../types/user';
import { loadComments, loadDataUser, loadMovies, loadPromo,
  failPostComment, redirectToRoute, setAuthStatus, loadSimilar, loadFavorites } from './actions-functions';
import {toast} from 'react-toastify';
import { ResponseText } from '../const';

export const fetchMoviesAction = (): ThunkActionResult =>
  // api - сконфигурированный экземпляр axios (а также extraArgument)
  // thunk - это middleware(функция). Применяем, чтобы получить доступ к параметрам (dispatch, _getState, api)
  async (dispatch, _getState, api): Promise<void> => {
    // Почему то дженерик подходит по типу не для константы, а для свйоства "data"
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
  };

export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Favorite);
    dispatch(loadFavorites(data));
  };

export const fetchSimilarAction = (movieId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(`${APIRoute.Movies}/${movieId}/${APIRoute.PostfixSimilar}`);
    dispatch(loadSimilar(data));
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
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${movieId}`, {rating, comment});
      dispatch(loadComments(data));
      dispatch(redirectToRoute(`${AppRoute.Films}/${movieId}`));

    } catch(errStatus) {
      errStatus === 400 && toast.info(ResponseText.PostFail);
      errStatus === undefined && toast.info(ResponseText.NoInternet);
      dispatch(failPostComment(true));
    }
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
    try {
      // data аналогично AuthInfo;
      const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(loadDataUser(data));
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));

    } catch(errStatus) {
      console.log(errStatus);
    }
  };

export const changeFavoriteAction = (movieId: number, isFavorite: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Movie>(`${APIRoute.Favorite}/${movieId}/${isFavorite}`);
      dispatch(loadFavorites([data]));

    } catch(errStatus) {
      console.log(errStatus);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(loadDataUser(null));
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));

    } catch(errStatus) {
      console.log(errStatus);
    }
  };
