import express from 'express';
import cors from 'cors';
import {films} from '../mocks/films.js';

const app = express();

// Устараняет предупреждение:
// Access to XMLHttpRequest at 'http://localhost:3002/films' from origin 'http://localhost:3001' has been blocked
// by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(cors());

app.use(express.json());
const PORT = 3002;

app.get('/films', (req, res) => {
  res.status(200).json(films);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен, мать твою, чего еще тебе надо?');
});
