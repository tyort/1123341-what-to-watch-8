import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { AuthInfo } from '../../types/user';

export const getAuthStatus = (state: State): AuthorizationStatus => state.USER.authorizationStatus;
export const getDataUser = (state: State): AuthInfo | null => state.USER.currentUser;
