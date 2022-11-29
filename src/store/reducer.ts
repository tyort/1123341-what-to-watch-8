import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getMoviesByGenre} from './action';
import {films, genres} from '../mocks/films';

const initialState = {
  genre: 'All genres',
  films,
  genres
};

// Редюсеры определяют, как состояние приложения изменяется в ответ на экшены, отправленные в стор.
// Помните, что экшены только описывают, _что произошло, но не описывают, как изменяется состояние приложения.
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getMoviesByGenre, (state) => {
      state.genre !== 'All genres'
        ? state.films = films.filter((movie) => movie.genre === state.genre)
        : state.films = films.slice();
    });
});

export {reducer};
