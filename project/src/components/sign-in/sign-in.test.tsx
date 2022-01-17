import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignInScreen from './sign-in';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Component: SignInScreen', () => {
  it('should render "SignInScreen" when user navigate to "/login" url', () => {
    const history = createMemoryHistory();
    history.push('/fucking_address'); // адрес не влияет на результат теста

    // В исходном компоненте применялся хук useSelector для статуса юзера
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      // если не обернуть в Provider, то хуки from 'react-redux' будут ругаться
      // store в виде пустого объекта, а именно "{}"
      <Provider store={store}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    // getBy... - Если этого текста нет, то тест сразу выдаст ошибку
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByText(/2019 What to watch Ltd/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();

    // Имитация ввода логина и пароля
    userEvent.type(screen.getByTestId('user-email'), 'keks@mail.ru');
    userEvent.type(screen.getByTestId('user-password'), '1234abc');

    // getByDisplayValue - текст в полях ввода
    expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234abc/i)).toBeInTheDocument();
  });
});
