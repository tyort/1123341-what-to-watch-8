import {createReducer} from '@reduxjs/toolkit';
import { Film } from '../types/film';
import {changeGenre, getMoviesByGenre, getMoviesCount, loadMovies, loadGenres, setAuthorizationStatus} from './action';

const FILMS_COUNT_DIVIDER = 4;

const initialState: {
  genre: string;
  films: Film[];
  genres: string[];
  filmsCount: number;
  showButton: boolean;
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
} = {
  genre: 'All genres',
  films: [],
  genres: [],
  filmsCount: FILMS_COUNT_DIVIDER,
  showButton: true,
  authorizationStatus: 'UNKNOWN'
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
      state.films = state.films
        .slice()
        .filter((movie) => movie.genre === state.genre || state.genre === 'All genres');
    })
    .addCase(getMoviesCount, (state, action) => {
      const {isCountReset} = action.payload;

      if (isCountReset) {
        state.filmsCount = FILMS_COUNT_DIVIDER;
      } else {
        state.filmsCount += FILMS_COUNT_DIVIDER;
      }

      state.showButton = state.films.length > state.filmsCount;
    })
    .addCase(loadMovies, (state, action) => {
      state.films = action.payload;
      state.showButton = state.films.length > FILMS_COUNT_DIVIDER;
    })
    .addCase(loadGenres, (state, action) => {
      state.genres = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
