import { AuthorizationStatus } from '../const';
import { Movie } from './movie';
import { Comment } from './comment';
import { AuthInfo } from './user';

export type State = {
  filteredMovies: Movie[],
  AllMovies: Movie[],
  promo: Movie | null,
  comments: Comment[],
  genre: string,
  moviesCount: number,
  isBtnShow: boolean,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  currentUser: AuthInfo | null,
};
