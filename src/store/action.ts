import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { User } from '../mocks/users';

// Действие - это самый обычный объект;
export const loadMovies = createAction<{
  moviesForView: Film[];
  genres: string[];
  genre: string;
  showButton: boolean;
}>('loadingData/loadFilms');
export const loadComments = createAction<Comment[]>('loadingData/loadComments');
export const setAuthorizationStatus = createAction<User | 'NO_AUTH' | 'UNKNOWN'>('authorization/setAuthorizationStatus');
export const showErrorMessage = createAction<string | undefined>('error/showErrorMessage');
export const hideErrorMessage = createAction('error/hideErrorMessage');
