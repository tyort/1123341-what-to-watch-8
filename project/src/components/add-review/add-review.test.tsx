import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeMovies } from '../../mocks/films';
import AddReviewScreen from './add-review';

const history = createMemoryHistory();
const fakeMovie = makeFakeMovies(1)[0];

jest.mock('../header-user/header-user', () => {
  const mockHeaderUser = () => <>This is mock HeaderUserScreen</>;
  return {
    __esModule: true,
    default: mockHeaderUser,
  };
});

jest.mock('../logo/logo', () => {
  const mockLogo = () => <>This is mock LogoScreen</>;
  return {
    __esModule: true,
    default: mockLogo,
  };
});

describe('Component: AddReview', () => {
  it('Should render correctly', () => {
    render(
      <Router history={history}>
        <AddReviewScreen
          movie={fakeMovie}
          // В фигурных скобках должна быть функция, возвращающая JSX.Element
          renderRating={jest.fn(() => <h1>There are rating stars</h1>)}
        />
      </Router>);

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText(/WTW/)).toBeInTheDocument();
    expect(screen.getByText(/This is mock HeaderUserScreen/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock LogoScreen/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/There are rating stars/i)).toBeInTheDocument();
  });

  it('Should redirect to needed movie url when user clicked to link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={`${AppRoute.Films}/${fakeMovie.id}`} exact>
            <h1>{`I want to know about ${fakeMovie.name}`}</h1>
          </Route>
          <Route>
            <AddReviewScreen
              movie={fakeMovie}
              renderRating={jest.fn(() => <h1>There are rating stars</h1>)}
            />
          </Route>
        </Switch>
      </Router>);

    // queryBy... в случае отсутствия вернет null, но не выкинет ошибку;
    expect(screen.queryByText(new RegExp(`I want to know about ${fakeMovie.name}`, 'i'))).not.toBeInTheDocument();
    userEvent.click(screen.getByText(new RegExp(`${fakeMovie.name}`)));
    expect(screen.queryByText(new RegExp(`I want to know about ${fakeMovie.name}`, 'i'))).toBeInTheDocument();
  });
});
