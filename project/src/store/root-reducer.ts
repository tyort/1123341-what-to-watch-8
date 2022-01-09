import {combineReducers} from 'redux';
import { moviesReducer } from './movies-reducer/movies-reducer';
import { userReducer } from './user-reducer/user-reducer';
import { commentsReducer } from './comments-reducer/comments-reducer';

export enum NameSpace {
  comments = 'COMMENTS',
  movies = 'MOVIES',
  user = 'USER',
}

// combineReducers объединяем редьюсеры
export const rootReducer = combineReducers({
  // [ключ хранилища]: управляем этим редьюсером
  [NameSpace.movies]: moviesReducer,
  [NameSpace.user]: userReducer,
  [NameSpace.comments]: commentsReducer,
});

// Описываем тип корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;
