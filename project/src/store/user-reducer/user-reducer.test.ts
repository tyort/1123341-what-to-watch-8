import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../mocks/user-data';
import { loadDataUser, setAuthStatus } from '../actions-functions';
import { initialState, userReducer } from '../user-reducer/user-reducer';

const fakeUser = makeFakeUser();

describe('Reducer: userReducer', () => {
  it('Should set authorizaton status correctly', () => {
    expect(userReducer(initialState, setAuthStatus(AuthorizationStatus.Auth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
  });
  it('Should set current user data', () => {
    expect(userReducer(initialState, loadDataUser(fakeUser)))
      .toEqual({...initialState, currentUser: fakeUser});
  });
});
