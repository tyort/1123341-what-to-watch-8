import { AnyAction } from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import { hideErrorMessage } from '../action';
import {reducer} from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const setErrorMsg: Middleware<unknown, Reducer> =
  (store) =>
    (next) =>
      (action: AnyAction) => {
        if (action.type === 'error/showErrorMessage') {
          const errorTime = setTimeout(() => {
            store.dispatch(hideErrorMessage());
            clearTimeout(errorTime);
          }, 5000);
        }

        return next(action);
      };
