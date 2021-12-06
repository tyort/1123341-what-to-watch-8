import {ActionName, Actions} from '../types/action';
import {State} from '../types/state';
import {genres} from '../const';
import {movies} from '../mocks/films';

const INITIAL_GENRE = 'All genres';
const INITIAL_MOVIES_COUNT = 8;

const initialState = {
  filteredMovies: movies.slice(0, INITIAL_MOVIES_COUNT),
  AllMovies: movies,
  genre: INITIAL_GENRE,
  moviesCount: INITIAL_MOVIES_COUNT,
  isBtnShow: true,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionName.ChangeGenre: {
      const AllfilteredMovies = state.AllMovies.filter((film) => (
        action.payload !== INITIAL_GENRE ? genres.get(film.genre) === action.payload : true
      ));
      const isBtnShow = AllfilteredMovies.length > state.moviesCount;
      const moviesCount = INITIAL_MOVIES_COUNT;
      const filteredMovies = AllfilteredMovies.slice(0, moviesCount);

      return {
        ...state,
        moviesCount,
        genre: action.payload,
        filteredMovies,
        isBtnShow,
      };
    }
    case ActionName.IncreaseCount: {
      const moviesCount = state.moviesCount + INITIAL_MOVIES_COUNT;
      const AllfilteredMovies = state.AllMovies.filter((film) => (
        state.genre !== INITIAL_GENRE ? genres.get(film.genre) === state.genre : true
      ));
      const isBtnShow = AllfilteredMovies.length > moviesCount;
      const filteredMovies = AllfilteredMovies.slice(0, moviesCount);

      return {
        ...state,
        moviesCount,
        filteredMovies,
        isBtnShow,
      };
    }
    default:
      return state;
  }
};

export {reducer};
