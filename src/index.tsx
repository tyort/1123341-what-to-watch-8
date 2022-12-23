import React from 'react'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import ReactDOM from 'react-dom/client'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import App from './components/app/app';
import {Provider} from 'react-redux'; // Provider - компонент. Мостик между React и Redux;
import {films} from './mocks/films';
import {store} from './store';
import { fetchMoviesAction } from './store/api-actions';

// Благодаря подключению "thunk" в "store" мы теперь можем диспатчить функции,
// имеющих под капотом некую асинхронность;
store.dispatch(fetchMoviesAction()); // Возвращает Promise

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        films={films}
      />
    </Provider>
  </React.StrictMode>,
);
