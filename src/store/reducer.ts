import {createReducer} from '@reduxjs/toolkit';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import {hideErrorMessage, loadMovies, loadComments, setAuthorizationStatus, showErrorMessage} from './action';

const FILMS_COUNT_DIVIDER = 4;

const initialState: {
  genre: string;
  films: Film[];
  genres: string[];
  filmsCount: number;
  showButton: boolean;
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
  errorMessage: string | undefined;
  currentComments: Comment[];
} = {
  genre: 'All genres',
  films: [],
  genres: [],
  filmsCount: FILMS_COUNT_DIVIDER,
  showButton: true,
  authorizationStatus: 'UNKNOWN',
  errorMessage: undefined,
  currentComments: []
};

// Редюсеры определяют, как состояние приложения изменяется в ответ на экшены, отправленные в стор.
// Помните, что экшены только описывают, _что произошло, но не описывают, как изменяется состояние приложения.
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadComments, (state, action) => {
      state.currentComments = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      const {moviesForView, genres, genre, showButton} = action.payload;
      state.films = moviesForView;
      state.genres = genres;
      state.genre = genre;
      state.showButton = showButton;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      if (typeof action.payload !== 'string') {
        state.authorizationStatus = 'AUTH';
      } else {
        state.authorizationStatus = action.payload;
      }
    })
    .addCase(showErrorMessage, (state, action) => {
      state.errorMessage = action.payload;
    })
    .addCase(hideErrorMessage, (state) => {
      state.errorMessage = undefined;
    });
});

export {reducer};
