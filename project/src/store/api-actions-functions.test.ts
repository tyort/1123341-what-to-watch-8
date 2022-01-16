/* eslint-disable camelcase */
import { createAPI } from '../backend/api';
import MockAdapter from 'axios-mock-adapter'; // поможет замокать axios
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/state';
import { makeFakeMovies } from '../mocks/films';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { changeFavoriteAction, checkAuthAction, fetchCommentsAction, fetchFavoritesAction, fetchMoviesAction, fetchPromoAction, fetchSimilarAction, loginAction, logoutAction, postCommentAction } from './api-actions-functions';
import { loadComments, loadDataUser, loadFavorites, loadMovies, loadPromo, loadSimilar, redirectToRoute, setAuthStatus } from './actions-functions';
import { makeFakeReviews } from '../mocks/reviews';
import { makeFakeUser } from '../mocks/user-data';
import { User, AuthInfo } from '../types/user';

describe('Async actions', () => {
  const api = createAPI(); // реальный axios
  const mockAPI = new MockAdapter(api); // замоканный axios
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should dispatch loadMovies when GET /films', async () => {
    const fakeMovies = makeFakeMovies(4);

    mockAPI
      .onGet(APIRoute.Movies)
      .reply(200, fakeMovies);

    const store = mockStore();
    await store.dispatch(fetchMoviesAction());

    expect(store.getActions()).toEqual([loadMovies(fakeMovies)]);
  });
  it('Should dispatch loadFavorites when GET /favorite', async () => {
    const fakeMovies = makeFakeMovies(4);

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeMovies);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());

    expect(store.getActions()).toEqual([loadFavorites(fakeMovies)]);
  });
  it('Should dispatch loadSimilar when GET /films/:movieId/similar', async () => {
    const fakeMovies = makeFakeMovies(4);

    mockAPI
      .onGet(`${APIRoute.Movies}/2/${APIRoute.PostfixSimilar}`)
      .reply(200, fakeMovies);

    const store = mockStore();
    await store.dispatch(fetchSimilarAction(2));

    expect(store.getActions()).toEqual([loadSimilar(fakeMovies)]);
  });
  it('Should dispatch loadPromo when GET /promo', async () => {
    const fakeMovie = makeFakeMovies(1)[0];

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakeMovie);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([loadPromo(fakeMovie)]);
  });
  it('Should dispatch loadComments when GET /comments/:movieId', async () => {
    const fakeReviews = makeFakeReviews(3);

    mockAPI
      .onGet(`${APIRoute.Comments}/3`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(3));

    expect(store.getActions()).toEqual([loadComments(fakeReviews)]);
  });
  it('Should dispatch loadComments and redirectToRoute when POST /comments/:movieId', async () => {
    const fakeReviews = makeFakeReviews(3);

    mockAPI
      .onPost(`${APIRoute.Comments}/3`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(postCommentAction(3, 5, 'great motherfucker!!!'));

    expect(store.getActions()).toEqual([
      loadComments(fakeReviews),
      redirectToRoute(`${AppRoute.Films}/3`),
    ]);
  });
  it('Should dispatch loadFavorites when POST /favorite/3/1', async () => {
    const fakeMovie = {...makeFakeMovies(1)[0], id: 3, is_favorite: true};

    mockAPI
      .onPost(`${APIRoute.Favorite}/3/1`)
      .reply(200, fakeMovie);

    const store = mockStore();
    await store.dispatch(changeFavoriteAction(3, 1));

    expect(store.getActions()).toEqual([
      loadFavorites([fakeMovie]),
    ]);
  });
  it('Should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    const fakeUser = makeFakeUser();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    expect(store.getActions()).toEqual([]); // подтверждает, что никаких действий не было

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      loadDataUser(fakeUser),
      setAuthStatus(AuthorizationStatus.Auth),
    ]);
  });
  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const email = 'test@test.ru';
    const fakeUserPost: User = {email, password: '123456'};
    const fakeUserGet: AuthInfo = {...makeFakeUser(), email};

    mockAPI
      .onPost(APIRoute.Login) // при обращении клиента к axios методом POST
      .reply(200, fakeUserGet); // ответим кодом 200 и вернем тело ответа

    const store = mockStore();

    // вместо LocalStorage используем Storage(Node.js), Добавляем свойство setItem
    // Без лишнего кода выполняет реальную работу нашего LocalStorage
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUserPost));

    expect(store.getActions()).toEqual([
      loadDataUser(fakeUserGet),
      setAuthStatus(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    // Storage.prototype.setItem вместо localStorage.setItem

    // проверка на единоразовый вызов, как раз здесь нам помог API jest.fn()
    expect(Storage.prototype.setItem).toBeCalledTimes(1);

    // проверяем с какими аргументами была вызвана функция
    // похоже на localStorage.setItem(AUTH_TOKEN_KEY_NAME, token)
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch', fakeUserGet.token);
  });
  it('should dispatch loadDataUser and setAuthStatus when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([loadDataUser(null), setAuthStatus(AuthorizationStatus.NoAuth)]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch');
  });
});
