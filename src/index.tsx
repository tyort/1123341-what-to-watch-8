import React from 'react'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import ReactDOM from 'react-dom/client'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import { Provider } from 'react-redux'; // Provider - компонент. Мостик между React и Redux;
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { films } from './mocks/films';
import { store } from './store';
import { fetchAuthAction, fetchMoviesAction } from './store/api-actions';
import { FILMS_COUNT_DIVIDER } from './utils';

// Благодаря подключению "thunk" в "store" мы теперь можем диспатчить функции,
// имеющих под капотом некую асинхронность;
store.dispatch(fetchMoviesAction({genre: 'All genres', moviesCount: FILMS_COUNT_DIVIDER})); // Возвращает Promise
store.dispatch(fetchAuthAction({email: 'gomarjoba@mail.ru', password: '111'}));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App
        films={films}
      />
    </Provider>
  </React.StrictMode>,
);
