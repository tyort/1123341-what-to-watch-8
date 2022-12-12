import { createAction } from '@reduxjs/toolkit';

// Действие - это самый обычный объект;
export const changeGenre = createAction<{genre: string}>('movies/changeGenre');
export const getMoviesByGenre = createAction('movies/getMoviesByGenre');
export const getMoviesCount = createAction<{isCountReset: boolean}>('movies/getMoviesCount');
