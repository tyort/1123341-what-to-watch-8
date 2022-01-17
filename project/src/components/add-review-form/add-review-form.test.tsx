import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeMovies } from '../../mocks/films';
import { makeFakeReviews } from '../../mocks/reviews';
import AddReviewFormScreen from './add-review-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeMovie = makeFakeMovies(1)[0];
const fakeReviews = makeFakeReviews(3);

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  return {
    ...originReact,
    useRef: (arg: HTMLTextAreaElement | null) => (
      {current: {value: 'Privet! MotherFucker', fucking: arg}}
    ),
  };
});

describe('Component: AddReviewForm', () => {
  it('Should render correctly', () => {
    const store = mockStore({
      COMMENTS: {
        isPostCommentFailed: false,
        comments: fakeReviews,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewFormScreen
            rating={5}
            onRateChange={jest.fn()}
            onTextChange={jest.fn()}
            movieId={fakeMovie.id}
            isBtnDisabled={false}
            textRef={useRef(null)}
          />
        </Router>
      </Provider>);

    userEvent.type(screen.getByTestId('review-text'), 'Hello! Motherfucker');
    expect(screen.getByDisplayValue(/Hello! Motherfucker/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    // При disabled={true} или disabled={false} - мы просто реализуем проверку,
    // как у нативного HTML: Либо есть disabled, либо отсутствует.
    expect(screen.queryByRole('button')).not.toHaveAttribute('disabled');

    expect(screen.getByTestId(/star-5/i)).toHaveAttribute('checked');
    expect(screen.queryByTestId(/star-9/i)).not.toHaveAttribute('checked');
  });
});
