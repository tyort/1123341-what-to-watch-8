import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux'; // @reduxjs/toolkit или redux
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { State } from '../../types/state';
import AllGenresScreen from './all-genres';
import {changeGenre} from '../../store/actions-functions';

const mockStore = configureMockStore<State, AnyAction>();
const history = createMemoryHistory();

describe('Component: AllGenres', () => {
  it('Should render correctly', () => {
    const store = mockStore({
      MOVIES: {
        genre: 'porn',
        allGenres: ['horror', 'classic', 'porn', 'drama'],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AllGenresScreen/>
        </Router>
      </Provider>);

    expect(screen.getByTestId(/horror/i)).toBeInTheDocument();
    expect(screen.getByTestId(/classic/i)).toBeInTheDocument();
    expect(screen.getByTestId(/porn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/porn/i)).toHaveClass('catalog__genres-item catalog__genres-item--active');
    expect(screen.getByTestId(/drama/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/drama/i));
    userEvent.click(screen.getByText(/classic/i));
    userEvent.click(screen.getByText(/horror/i));

    expect(store.getActions()).toEqual([
      changeGenre('drama'),
      changeGenre('classic'),
      changeGenre('horror'),
    ]);
  });
});
