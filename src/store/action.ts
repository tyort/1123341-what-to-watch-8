import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

// Действие - это самый обычный объект;
export const getMoviesCount = createAction<{isCountReset: boolean}>('movies/getMoviesCount');
export const loadMovies = createAction<{currentMovies: Film[]; genres: string[]; genre: string}>('loadingData/loadFilms');
export const setAuthorizationStatus = createAction<'AUTH' | 'NO_AUTH' | 'UNKNOWN'>('authorization/setAuthorizationStatus');

