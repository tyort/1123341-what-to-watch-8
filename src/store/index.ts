/* eslint-disable no-console */
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();


// Читается неплохо, но вложенность
// немного пугает
export function fuckYouSanta(store: { getState: () => any }) {
  return function (_nextDispath: any) {
    return function (action: any) {
      console.log(`[${Date()}] — выполнено действие`);
      console.log(action); // объект
      console.log('Текущее состояние:');
      console.log(store.getState()); // объект состояния
    };
  };
}

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api } }),
// });
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fuckYouSanta),
});
