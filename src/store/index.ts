/* eslint-disable no-console */
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();


export const fuckYouSanta = (store: any) => (next: any) => (action: any) => {
  console.log(`[${Date()}] — выполнено действие`);
  console.log(action);
  console.log('Текущее состояние:');
  console.log(store.getState());

  console.log('Выполняем действие…');
  // С помощью "next" мы выполняем действие и передаём результат дальше, следующему middleware.
  next(action);
  console.log(store.getState());
};

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api } }),
// });
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fuckYouSanta),
});
