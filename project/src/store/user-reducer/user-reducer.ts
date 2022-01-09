/* eslint-disable no-console */
import {ActionName} from '../../types/action';
import {UserState} from '../../types/state';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: null,
};

export const userReducer = (state: UserState = initialState, action: 'кто здесь?'): UserState => {
  switch (action.type) {
    case ActionName.SetAuthStatus:
      return {...state, authorizationStatus: action.payload};

    case ActionName.LoadDataUser:
      return {...state, currentUser: action.payload};

    default:
      return state;
  }
};
