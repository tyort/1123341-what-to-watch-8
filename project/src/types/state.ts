import { AuthorizationStatus } from '../const';
import { Movie } from './movie';
import { Comment } from './comment';
import { AuthInfo } from './user';
import { RootState } from '../store/root-reducer';

export type State = RootState;

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  currentUser: AuthInfo | null,
};

export type MoviesState = {
  filteredMovies: Movie[],
  allMovies: Movie[],
  similarMovies: Movie[],
  allGenres: string[],
  promo: Movie | null,
  genre: string,
  isDataLoaded: boolean,
  moviesCount: number,
  isBtnShow: boolean,
};

export type CommentsState = {
  comments: Comment[],
  isPostCommentFailed: boolean,
};
