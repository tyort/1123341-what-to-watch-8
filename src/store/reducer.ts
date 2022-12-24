import {createReducer} from '@reduxjs/toolkit';
import { Film } from '../types/film';
import {getMoviesCount, loadMovies, setAuthorizationStatus} from './action';

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
      const {currentMovies, genres, genre} = action.payload;
      state.films = currentMovies;
      state.genres = genres;
      state.genre = genre;
      state.showButton = state.films.length > FILMS_COUNT_DIVIDER;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
