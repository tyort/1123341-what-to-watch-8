import {UserState} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadDataUser, setAuthStatus } from '../actions-functions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadDataUser, (state, action) => {
      state.currentUser = action.payload;
    });
});
