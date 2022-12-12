import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getMoviesByGenre, getMoviesCount} from './action';
import {films, genres} from '../mocks/films';

const FILMS_COUNT_DIVIDER = 4;

const isButtonShow: boolean = films.length > FILMS_COUNT_DIVIDER;

const initialState = {
  genre: 'All genres',
  films,
  genres,
  filmsCount: FILMS_COUNT_DIVIDER,
  showButton: isButtonShow
};

// Редюсеры определяют, как состояние приложения изменяется в ответ на экшены, отправленные в стор.
// Помните, что экшены только описывают, _что произошло, но не описывают, как изменяется состояние приложения.
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getMoviesByGenre, (state) => {
      state.films = films.filter((movie) => movie.genre === state.genre || state.genre === 'All genres');
    })
    .addCase(getMoviesCount, (state, action) => {
      const {isCountReset} = action.payload;

      if (isCountReset) {
        state.filmsCount = FILMS_COUNT_DIVIDER;
      } else {
        state.filmsCount += FILMS_COUNT_DIVIDER;
      }

      state.showButton = state.films.length > state.filmsCount;
    });
});

export {reducer};
