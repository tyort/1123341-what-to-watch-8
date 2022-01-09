import { Movie } from '../../types/movie';
import { State } from '../../types/state';

export const getPromo = (state: State): Movie | null => state.MOVIES.promo;
export const getAllMovies = (state: State): Movie[] => state.MOVIES.allMovies;
export const getFilteredMovies = (state: State): Movie[] => state.MOVIES.filteredMovies;
export const getSimilarMovies = (state: State): Movie[] => state.MOVIES.similarMovies;
export const getAllGenres = (state: State): string[] => state.MOVIES.allGenres;
export const getCurrentGenre = (state: State): string => state.MOVIES.genre;
export const getMoviesCount = (state: State): number => state.MOVIES.moviesCount;
export const getBtnAppearance= (state: State): boolean => state.MOVIES.isBtnShow;
export const getMoviesLoadStatus = (state: State): boolean => state.MOVIES.isDataLoaded;
