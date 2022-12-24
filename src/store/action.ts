import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

// Действие - это самый обычный объект;
export const loadMovies = createAction<{
  moviesForView: Film[];
  genres: string[];
  genre: string;
  showButton: boolean;
}>('loadingData/loadFilms');
export const setAuthorizationStatus = createAction<'AUTH' | 'NO_AUTH' | 'UNKNOWN'>('authorization/setAuthorizationStatus');

