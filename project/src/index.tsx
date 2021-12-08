import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './backend/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer'; // на основании action меняет state в store.
import ReactDOM from 'react-dom'; // для работы с web. Вместо него для разработки мобильных приложений можно использовать react-native.
import App from './components/app/app';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction, fetchMoviesAction } from './store/api-actions-functions';

// Создаем экземпляр axios. Мы заранее уже его сконфигурировали;
const api = createAPI();

const store = createStore(
  reducer,

  // Добавит поддержку инструмента Redux DevTools (расширение для браузера).
  composeWithDevTools(

    // Регистрируем middlewares. Вместо параметра "api" мы можем передать все, что угодно.
    // так мы можем использовать api в асинхронной функции типа ThunkActionResult
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchMoviesAction());

ReactDOM.render(
  <React.StrictMode>
    {/* Provider - делает "Redux store" доступным для вызовов connect() из всех дочерних компонентов.*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
