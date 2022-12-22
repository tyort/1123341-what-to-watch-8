import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

const startShipping = (payload: any) => ({
  type: 'fuck/what-the-fuck',
  payload
});

// Это действие произойдет по истечении 5сек
const endShipping = (payload: any) => ({
  type: 'sex/there-is-no-sex',
  payload
});

// Теперь эту функцию может принимать dispatch
const ship = (payload: any) => (next: any) => {
  next(startShipping(Object.assign({}, payload, {
    status: 'shipping'
  })));

  setTimeout(() => {
    next(endShipping(Object.assign({}, payload, {
      status: 'shipped'
    })));
  }, 5000);
};

export const store = configureStore({
  reducer,
  // thunk - чтобы dispatch научился принимать функции, а не только объекты.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

store.dispatch(ship({ id: 0 }));
