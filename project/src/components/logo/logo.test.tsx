import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      // Router - этот компонент нужен, т.к. без него не отрендерится <Logo />
      // Потому что внутри <Logo /> используется Link(для него еще нужен объект history)
      <Router history={history}>
        <Logo />
      </Router>);

    // screen - олицетворяет пользовательский экран
    // Найдем элемент по роли
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake'); // Сработает как триггер, указываем любой маршрут

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>

          {/* Мы перейдем сюда в случае указания любого адреса */}
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    // getByAltText вместо queryByText выкинул бы ошибку
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/T/)).toBeInTheDocument();
    expect(screen.getAllByText(/W/)).toHaveLength(2);

    // имитация пользовательских событий
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
