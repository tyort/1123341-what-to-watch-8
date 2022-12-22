/* eslint-disable no-console */
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();


export const fuckYouSanta = (store: any) => (next: any) => (action: any) => {
  return next(action);
};

export const fuckYouBambi = (store: any) => (next: any) => (action: any) => {
  next(action);
  return 'lightweight';
};

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api } }),
// });
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fuckYouSanta, fuckYouBambi),
});
