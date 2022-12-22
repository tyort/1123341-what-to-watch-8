import express from 'express';
import {films} from '../mocks/films.js';

const app = express();
app.use(express.json());
const PORT = 3002;


console.log(films);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен, мать твою, чего еще тебе надо?');
});
