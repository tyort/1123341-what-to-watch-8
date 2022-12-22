import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

// Действие - это самый обычный объект;
export const changeGenre = createAction<{genre: string}>('movies/changeGenre');
export const getMoviesByGenre = createAction('movies/getMoviesByGenre');
export const getMoviesCount = createAction<{isCountReset: boolean}>('movies/getMoviesCount');
export const loadMovies = createAction<Film[]>('loadingData/loadFilms');
export const loadGenres = createAction<string[]>('loadingData/loadGenres');
