import React from 'react';

// для работы с web. Вместо него для разработки мобильных приложений
// можно использовать react-native
import ReactDOM from 'react-dom';

import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
