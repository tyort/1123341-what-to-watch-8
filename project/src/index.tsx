import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer'; // на основании action меняет state в store.
import ReactDOM from 'react-dom'; // для работы с web. Вместо него для разработки мобильных приложений можно использовать react-native.
import App from './components/app/app';

const store = createStore(
  reducer,
  composeWithDevTools(), // Добавит поддержку инструмента Redux DevTools (расширение для браузера).
);

ReactDOM.render(
  <React.StrictMode>
    {/* Provider - делает "Redux store" доступным для вызовов connect() из всех дочерних компонентов.*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
