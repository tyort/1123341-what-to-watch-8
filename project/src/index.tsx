import React from 'react';
import {createAPI} from './backend/api';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'; // Можно убрать импорты redux и redux-thunk. Они и так в этом пакете есть
import {rootReducer} from './store/root-reducer'; // на основании action меняет state в store.
import ReactDOM from 'react-dom'; // для работы с web. Вместо него для разработки мобильных приложений можно использовать react-native.
import App from './components/app/app';
import { checkAuthAction, fetchMoviesAction, fetchPromoAction } from './store/api-actions-functions';
import { redirect } from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Создаем экземпляр axios. Мы заранее уже его сконфигурировали;
const api = createAPI();

// configureStore - конфигурируем хранилище, в качестве аргумента: объект с настройками, включена подддержка Redux DevTools
const store = configureStore({
  reducer: rootReducer, // корневой редьюсер

  // devTools: false, --> отключить Redux DevTools

  // В getDefaultMiddleware RTK передает ссылку, при помощи которой мы сможем подключить и настроить встроенные middleware.
  // getDefaultMiddleware - возвращает массив с middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

// До подключения redux-toolkit было так(см.ниже).
//
// const store = createStore(
//   reducer,
//   // Добавит поддержку инструмента Redux DevTools (расширение для браузера).
//   composeWithDevTools(
//     // Регистрируем middlewares. Вместо параметра "api" мы можем передать все, что угодно.
//     // так мы можем использовать api в асинхронной функции типа ThunkActionResult
//     applyMiddleware(thunk.withExtraArgument(api)),
//     applyMiddleware(redirect),
//   ),
// );

store.dispatch(checkAuthAction());
store.dispatch(fetchMoviesAction());
store.dispatch(fetchPromoAction());

ReactDOM.render(
  <React.StrictMode>
    {/* Provider - делает "Redux store" доступным для вызовов connect() из всех дочерних компонентов.*/}
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
