import {ActionName, Actions} from '../types/action';
import {State} from '../types/state';
import {} from '../const';
import {movies} from '../mocks/films';

const INITIAL_GENRE = 'All genres';

const initialState = {
  filteredMovies: movies,
  AllMovies: movies,
  genre: INITIAL_GENRE,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionName.ChangeGenre: {
      const filteredMovies = state.AllMovies.filter((film) => (
        action.payload !== INITIAL_GENRE ? film.genre === action.payload : true
      ));
      return {...state, genre: action.payload, filteredMovies};
    }
    default:
      return state;
  }
};

export {reducer};
