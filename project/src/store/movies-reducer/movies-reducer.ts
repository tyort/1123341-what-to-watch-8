/* eslint-disable no-console */
import {ActionName, Actions} from '../../types/action';
import {MoviesState} from '../../types/state';

const INITIAL_GENRE = 'All genres';
const INITIAL_MOVIES_COUNT = 8;

const initialState = {
  filteredMovies: [],
  allMovies: [],
  similarMovies: [],
  allGenres: [],
  promo: null,
  genre: INITIAL_GENRE,
  moviesCount: INITIAL_MOVIES_COUNT,
  isBtnShow: true,
  isDataLoaded: false,
};

export const moviesReducer = (state: MoviesState = initialState, action: Actions): MoviesState => {
  switch (action.type) {
    case ActionName.LoadPromo:
      return {...state, promo: action.payload};

    case ActionName.LoadMovies: {
      const allMovies = action.payload;
      const filteredMovies = allMovies.slice(0, state.moviesCount);
      const allGenres = [INITIAL_GENRE, ...new Set(allMovies.map((film) => film.genre))];
      return {...state, allMovies, filteredMovies, allGenres, isDataLoaded: true};
    }

    case ActionName.LoadFavorites: {
      const allMovies = state.allMovies.map((film) => (
        action.payload.find((favoriteMovie) => favoriteMovie.id === film.id) ?? film
      ));
      const promo = allMovies.find((movie) => movie.id === state.promo?.id) || state.promo;
      return {...state, allMovies, promo};
    }

    case ActionName.ChangeGenre: {
      const AllfilteredMovies = state.allMovies.filter((film) => (
        action.payload !== INITIAL_GENRE ? film.genre === action.payload : true
      ));
      const isBtnShow = AllfilteredMovies.length > state.moviesCount;
      const moviesCount = INITIAL_MOVIES_COUNT;
      const filteredMovies = AllfilteredMovies.slice(0, moviesCount);
      return {...state, moviesCount, genre: action.payload, filteredMovies, isBtnShow};
    }

    case ActionName.IncreaseCount: {
      const moviesCount = state.moviesCount + INITIAL_MOVIES_COUNT;
      const AllfilteredMovies = state.allMovies.filter((film) => (
        state.genre !== INITIAL_GENRE ? film.genre === state.genre : true
      ));
      const isBtnShow = AllfilteredMovies.length > moviesCount;
      const filteredMovies = AllfilteredMovies.slice(0, moviesCount);
      return {...state, moviesCount, filteredMovies, isBtnShow};
    }

    case ActionName.DefaultMoviesCount: {
      const isBtnShow = state.allMovies.length > INITIAL_MOVIES_COUNT;
      const filteredMovies = state.allMovies.slice(0, INITIAL_MOVIES_COUNT);
      return {...state, moviesCount: INITIAL_MOVIES_COUNT, filteredMovies, isBtnShow, genre: INITIAL_GENRE};
    }

    case ActionName.LoadSimilar:
      return {...state, similarMovies: action.payload.slice(0, 4)};

    default:
      return state;
  }
};
