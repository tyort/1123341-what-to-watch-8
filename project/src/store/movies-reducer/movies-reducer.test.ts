/* eslint-disable camelcase */
import { makeFakeMovies } from '../../mocks/films';
import { loadMovies, loadPromo, loadFavorites, changeGenre, increaseMoviesCount, defaultMoviesCount, loadSimilar } from '../actions-functions';
import { initialState } from '../movies-reducer/movies-reducer';
import { moviesReducer } from './movies-reducer';
import { Movie } from '../../types/movie';

const fakeMovies = makeFakeMovies(9);
const fakePromo = fakeMovies[0];

describe('Reducer: moviesReducer', () => {
  it('Should upload promo to state from server', () => {
    expect(moviesReducer(initialState, loadPromo(fakePromo)))
      .toEqual({...initialState, promo: fakePromo});
  });
  it('Should upload movies to state from server', () => {
    const state = {
      allMovies: fakeMovies,
      filteredMovies: fakeMovies.slice(0, 8),
      allGenres: ['All genres', ...new Set(fakeMovies.map((film) => film.genre))],
      isDataLoaded: true,
    };

    expect(moviesReducer(initialState, loadMovies(fakeMovies)))
      .toEqual({...initialState, ...state});
  });
  it('Should upload favorites to state from server', () => {
    const fakeFilms = makeFakeMovies(9);
    const allMovies: Movie[] = fakeFilms.map((film) => ({...film, is_favorite: false}));
    const state = {...initialState, allMovies};
    const favorites: Movie[] = fakeFilms.map((film) => ({...film, is_favorite: true}));

    expect(moviesReducer(state, loadFavorites(favorites)))
      // почему-то allMovies: favorites выдает несоответствие из-за изменяемости данных;
      .toEqual({...initialState, allMovies: favorites});
  });
  it('Should change state in case of changing genre', () => {
    const allMovies = fakeMovies.map((film, index) => (
      index === 2 ? {...film, genre: 'OriginalGenre'} : film
    ));
    const genre = 'OriginalGenre';

    expect(moviesReducer({...initialState, allMovies}, changeGenre(genre)))
      .toEqual({
        ...initialState,
        allMovies,
        isBtnShow: false,
        genre,
        moviesCount: 8,
        filteredMovies: [allMovies[2]],
      });
  });
  it('Should increase movies count', () => {
    const state = {
      allMovies: fakeMovies,
      filteredMovies: fakeMovies.slice(0, 8),
      allGenres: ['All genres', ...new Set(fakeMovies.map((film) => film.genre))],
      isDataLoaded: true,
    };

    expect(moviesReducer({...initialState, ...state}, increaseMoviesCount()))
      .toEqual({
        ...initialState,
        ...state,
        isBtnShow: false,
        moviesCount: 16,
        filteredMovies: state.allMovies,
      });
  });
  it('Should reset movies count', () => {
    const state = {
      allMovies: fakeMovies,
      filteredMovies: fakeMovies,
      allGenres: ['All genres', ...new Set(fakeMovies.map((film) => film.genre))],
      isDataLoaded: true,
      genre: 'CurrentGenre',
      moviesCount: 16,
      isBtnShow: false,
      similarMovies: [],
      promo: null,
    };

    expect(moviesReducer(state, defaultMoviesCount()))
      .toEqual({
        ...state,
        isBtnShow: true,
        moviesCount: 8,
        filteredMovies: state.allMovies.slice(0, 8),
        genre: 'All genres',
      });
  });
  it('Should upload similar movies to state from server', () => {
    expect(moviesReducer(initialState, loadSimilar(fakeMovies)))
      .toEqual({...initialState, similarMovies: fakeMovies.slice(0, 4)});
  });
});
