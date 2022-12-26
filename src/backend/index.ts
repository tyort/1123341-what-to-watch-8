import express from 'express';
import cors from 'cors';
import {films, genres} from '../mocks/films.js';
import {users} from '../mocks/users.js';

const app = express();

// Устараняет предупреждение:
// Access to XMLHttpRequest at 'http://localhost:3002/films' from origin 'http://localhost:3001' has been blocked
// by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(cors());

app.use(express.json());
const PORT = 3002;

app.get('/films', (req, res) => {
  const {query} = req;
  const AllMoviesByGenre = films
    .slice()
    .filter((movie) => movie.genre === query.genre || query.genre === 'All genres');

  const showButton = AllMoviesByGenre.length > Number(query.moviesCount);
  const moviesForView = AllMoviesByGenre.slice(0, Number(query.moviesCount));
  res.status(200).json({moviesForView, genres, showButton});
});

app.get('/login', (req, res) => {
  const {email, password} = req.query;
  const currentUser = users.find((user) => user.email === email);

  if (currentUser === undefined) {
    return res.status(401).json('401 User not found');
  } else if (currentUser.password !== password) {
    return res.status(401).json('401 Wrong password');
  } else {
    return res.status(200).json('AUTH');
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен, мать твою, чего еще тебе надо?');
});
