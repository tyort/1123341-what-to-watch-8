import React from 'react'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import ReactDOM from 'react-dom/client'; // Добавляем здесь в точке входа, в остальных компонентах можно не добавлять;
import App from './components/app/app';

const PISYA = 5;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      pisya={PISYA}
    />
  </React.StrictMode>,
);
