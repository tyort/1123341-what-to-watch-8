import {ActionName, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus, genres} from '../const';

const INITIAL_GENRE = 'All genres';
const INITIAL_MOVIES_COUNT = 8;

const initialState = {
  filteredMovies: [],
  allMovies: [],
  promo: null,
  comments: [],
  genre: INITIAL_GENRE,
  moviesCount: INITIAL_MOVIES_COUNT,
  isBtnShow: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  currentUser: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionName.LoadPromo:
      return {...state, promo: action.payload};

    case ActionName.SetAuthStatus:
      return {...state, authorizationStatus: action.payload};

    case ActionName.LoadMovies: {
      const filteredMovies = action.payload.slice(0, state.moviesCount);
      return {...state, allMovies: action.payload, filteredMovies, isDataLoaded: true};
    }

    case ActionName.LoadComments:
      return {...state, comments: action.payload};

    case ActionName.ChangeGenre: {
      const AllfilteredMovies = state.allMovies.filter((film) => (
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
      const AllfilteredMovies = state.allMovies.filter((film) => (
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

    case ActionName.LoadDataUser:
      return {...state, currentUser: action.payload};

    default:
      return state;
  }
};

export {reducer};
