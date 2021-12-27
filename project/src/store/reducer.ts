import {ActionName, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';

const INITIAL_GENRE = 'All genres';
const INITIAL_MOVIES_COUNT = 8;

const initialState = {
  filteredMovies: [],
  favoriteMovies: [],
  allMovies: [],
  similarMovies: [],
  allGenres: [],
  promo: null,
  comments: [],
  genre: INITIAL_GENRE,
  moviesCount: INITIAL_MOVIES_COUNT,
  isBtnShow: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isPostCommentFailed: false,
  currentUser: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionName.FailPostComment:
      return {...state, isPostCommentFailed: action.payload};

    case ActionName.LoadPromo:
      return {...state, promo: action.payload};

    case ActionName.SetAuthStatus:
      return {...state, authorizationStatus: action.payload};

    case ActionName.LoadMovies: {
      const allMovies = action.payload;
      const filteredMovies = allMovies.slice(0, state.moviesCount);
      const allGenres = [INITIAL_GENRE, ...new Set(allMovies.map((film) => film.genre))];
      return {...state, allMovies, filteredMovies, allGenres, isDataLoaded: true};
    }

    case ActionName.LoadFavorites:
      return {...state, favoriteMovies: action.payload};

    case ActionName.LoadComments:
      return {...state, comments: action.payload};

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

    case ActionName.LoadDataUser:
      return {...state, currentUser: action.payload};

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

export {reducer};
