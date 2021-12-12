import { AuthorizationStatus } from '../const';
import { Movie } from './movie';
import { Comment } from './comment';

export type State = {
  filteredMovies: Movie[],
  AllMovies: Movie[],
  comments: Comment[],
  genre: string,
  moviesCount: number,
  isBtnShow: boolean,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
