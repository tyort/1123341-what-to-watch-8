import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeMovies } from '../../mocks/films';
import { defaultMoviesCount } from '../../store/actions-functions';
import FilmCardScreen from './film-card';

const history = createMemoryHistory();
const fakeMovies = makeFakeMovies(5);
const mockStore = configureMockStore();

jest.mock('../preview-player/preview-player', () => {
  const mockLogo = () => <>This is fucking preview</>;
  return {
    __esModule: true,
    default: mockLogo,
  };
});

describe('Component: FilmCard', () => {
  it('Should redirect to needed movie url when user clicked to card', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Films}/${fakeMovies[0].id}`} exact>
              <h1>There is {fakeMovies[0].name} movie page</h1>
            </Route>
            <Route>
              <FilmCardScreen
                movies={fakeMovies}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    fakeMovies.forEach((film) => {
      expect(screen.getByText(new RegExp(`${film.name}`, 'i'))).toBeInTheDocument();
    });
    expect(screen.getAllByText(/This is fucking preview/i)).toHaveLength(5);

    expect(screen.queryByText(new RegExp(`There is ${fakeMovies[0].name} movie page`, 'i'))).not.toBeInTheDocument();


    userEvent.click(screen.getByTestId(new RegExp(`${fakeMovies[0].name}-id${fakeMovies[0].id}`, 'i')));

    expect(store.getActions()).toEqual([
      defaultMoviesCount(),
    ]);

    expect(screen.getByText(new RegExp(`There is ${fakeMovies[0].name} movie page`, 'i'))).toBeInTheDocument();
  });
});
