import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux'; // @reduxjs/toolkit или redux
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import HeaderUserScreen from './header-user';
import { makeFakeUser } from '../../mocks/user-data';
import { Provider } from 'react-redux';
import * as ReactRedux from 'react-redux';

const history = createMemoryHistory();
const fakeUser = makeFakeUser();
const mockStore = configureMockStore<State, AnyAction>();

describe('Component: HeaderUser', () => {
  it('Should render correctly when user did sign-in', async () => {
    const dispatch = jest.fn();
    // В данном случае огромная разница между ReactRedux и 'react-redux'
    // useDispatch равен соответственно:
    //                    jest.SpyInstance<Dispatch<Action<any>>, []>
    // или                never
    const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: null,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderUserScreen/>
        </Router>
      </Provider>);


    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(useDispatch).toBeCalledTimes(1);
  });
  it('Should render correctly when user didn`t sign-in', () => {
    history.push('/fucking_address');

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        currentUser: fakeUser,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SignIn}>
              <h1>This is sign-in page</h1>
            </Route>
            <Route>
              <HeaderUserScreen/>
            </Route>
          </Switch>
        </Router>
      </Provider>);


    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is sign-in page/)).toBeInTheDocument();
  });
});
