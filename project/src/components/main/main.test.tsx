import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeMovies } from '../../mocks/films';
import MainScreen from './main';
import { Provider } from 'react-redux';
import * as ReactRedux from 'react-redux';
import { ActionName } from '../../types/action';
import { createAPI } from '../../backend/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../../types/state';


const history = createMemoryHistory();
const fakeMovies = makeFakeMovies(10);

jest.mock('../header-user/header-user', () => {
  const mockHeaderUser = () => <>This is mock HeaderUserScreen</>;
  return {
    __esModule: true,
    default: mockHeaderUser,
  };
});

jest.mock('../film-card/film-card', () => {
  const mockFilmCard = () => <>This is mock FilmCardScreen</>;
  return {
    __esModule: true,
    default: mockFilmCard,
  };
});

jest.mock('../all-genres/all-genres', () => {
  const mockAllGenres = () => <>This is mock AllGenresScreen</>;
  return {
    __esModule: true,
    default: mockAllGenres,
  };
});

jest.mock('../logo/logo', () => {
  const mockLogo = () => <>This is mock LogoScreen</>;
  return {
    __esModule: true,
    default: mockLogo,
  };
});

describe('Component: Main', () => {
  const api = createAPI(); // реальный axios
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('Should render correctly', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      MOVIES: {
        filteredMovies: fakeMovies,
        isBtnShow: true,
        promo: fakeMovies[3],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Player}/${fakeMovies[3].id}`} exact>
              <h1>There is {fakeMovies[3].name} movie</h1>
            </Route>
            <Route>
              <MainScreen/>
            </Route>
          </Switch>
        </Router>
      </Provider>);


    expect(screen.getByText(/This is mock HeaderUserScreen/i)).toBeInTheDocument();
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock AllGenresScreen/i)).toBeInTheDocument();
    expect(screen.getAllByText(/This is mock LogoScreen/i)).toHaveLength(2);
    expect(screen.getByText(/This is mock FilmCardScreen/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/2019 What to watch Ltd./i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/button-play/i));

    expect(useDispatch).toBeCalledTimes(2); // ???? Непонятно мне почему два раза
    expect(dispatch).nthCalledWith(1, {
      type: ActionName.DefaultMoviesCount,
    });

    expect(screen.getByText(new RegExp(`There is ${fakeMovies[3].name} movie`, 'i'))).toBeInTheDocument();
  });
});
