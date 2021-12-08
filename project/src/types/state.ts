import { AuthorizationStatus } from '../const';
import { Movie } from './movie';

export type State = {
  filteredMovies: Movie[],
  AllMovies: Movie[],
  genre: string,
  moviesCount: number,
  isBtnShow: boolean,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
