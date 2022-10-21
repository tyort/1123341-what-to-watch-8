import React from 'react'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import ReactDOM from 'react-dom/client'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import App from './components/app/app';
import {films} from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={films}
    />
  </React.StrictMode>,
);
