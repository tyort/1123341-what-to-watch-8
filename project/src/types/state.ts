import { Movie } from './movie';

export type State = {
  filteredMovies: Movie[],
  AllMovies: Movie[],
  genre: string
};