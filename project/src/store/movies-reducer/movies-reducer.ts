/* eslint-disable no-console */
import { createReducer } from '@reduxjs/toolkit';
import {MoviesState} from '../../types/state';
import { changeGenre, defaultMoviesCount, increaseMoviesCount, loadFavorites, loadMovies, loadPromo, loadSimilar } from '../actions-functions';

const INITIAL_GENRE = 'All genres';
const INITIAL_MOVIES_COUNT = 8;

const initialState: MoviesState = {
  filteredMovies: [],
  allMovies: [],
  similarMovies: [],
  allGenres: [],
  promo: null,
  genre: INITIAL_GENRE,
  moviesCount: INITIAL_MOVIES_COUNT,
  isBtnShow: true,
  isDataLoaded: false,
};

export const moviesReducer = createReducer(initialState, (builder) => {
  // builder - объект предоставляет методы(типа addCase), описывающие условия(case) без оператора switch;
  builder
    // addCase: 1-ый аргумент - ф-я, создающая действие (loadPromo.toString() === 'movies/loadPromo');
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      state.allMovies = action.payload;
      state.filteredMovies = state.allMovies.slice(0, state.moviesCount);
      state.allGenres = [INITIAL_GENRE, ...new Set(state.allMovies.map((film) => film.genre))];
      state.isDataLoaded = true;
    })
    .addCase(loadFavorites, (state, action) => {
      state.allMovies = state.allMovies.map((film) => (
        action.payload.find((favoriteMovie) => favoriteMovie.id === film.id) ?? film
      ));
      state.promo = state.allMovies.find((movie) => movie.id === state.promo?.id) || state.promo;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      const AllfilteredMovies = state.allMovies.filter((film) => (
        action.payload !== INITIAL_GENRE ? film.genre === state.genre : true
      ));
      state.isBtnShow = AllfilteredMovies.length > state.moviesCount;
      state.moviesCount = INITIAL_MOVIES_COUNT;
      state.filteredMovies = AllfilteredMovies.slice(0, state.moviesCount);
    })
    .addCase(increaseMoviesCount, (state) => {
      state.moviesCount += INITIAL_MOVIES_COUNT;
      const AllfilteredMovies = state.allMovies.filter((film) => (
        state.genre !== INITIAL_GENRE ? film.genre === state.genre : true
      ));
      state.isBtnShow = AllfilteredMovies.length > state.moviesCount;
      state.filteredMovies = AllfilteredMovies.slice(0, state.moviesCount);
    })
    .addCase(defaultMoviesCount, (state) => {
      state.isBtnShow = state.allMovies.length > INITIAL_MOVIES_COUNT;
      state.filteredMovies = state.allMovies.slice(0, INITIAL_MOVIES_COUNT);
      state.moviesCount = INITIAL_MOVIES_COUNT;
      state.genre = INITIAL_GENRE;
    })
    .addCase(loadSimilar, (state, action) => {
      state.similarMovies = action.payload.slice(0, 4);
    });
});
