/* eslint-disable no-console */
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();


export const fuckYouSanta = (store: any) => (_nextDispath: any) => (action: any) => {
  console.log(`[${Date()}] — выполнено действие`);
  console.log(action);
  console.log('Текущее состояние:');
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
