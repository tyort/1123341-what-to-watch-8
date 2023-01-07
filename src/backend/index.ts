import express, {Request, Response} from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import {films, genres} from '../mocks/films.js';
import {users} from '../mocks/users.js';
import {Comment} from '../types/comment';

const FILE_PATH_COMMENTS = 'C:/Users/Lenovo/OneDrive/Рабочий стол/what-to-watch/project/src/mocks/comments.json';

const app = express();

// Устараняет предупреждение:
// Access to XMLHttpRequest at 'http://localhost:3002/films' from origin 'http://localhost:3001' has been blocked
// by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(cors());

app.use(express.json());
const PORT = 3002;

app.get('/films', (req: Request, res: Response) => {
  const {query} = req;
  const AllMoviesByGenre = films
    .slice()
    .filter((movie) => movie.genre === query.genre || query.genre === 'All genres');

  const showButton = AllMoviesByGenre.length > Number(query.moviesCount);
  const moviesForView = AllMoviesByGenre.slice(0, Number(query.moviesCount));
  res.status(200).json({moviesForView, genres, showButton});
});

app.get('/login', (req: Request, res: Response) => {
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/comments/:film_id', async (req: Request, res: Response) => {
  try {
    const contents = await readFile(FILE_PATH_COMMENTS, { encoding: 'utf8' });
    return res.status(200).json(JSON.parse(contents));

  } catch (err) {
    return res.status(400).json('Comments request error');
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/comments/:film_id', async (req: Request, res: Response) => {
  try {
    let jsonData = await readFile(FILE_PATH_COMMENTS, { encoding: 'utf8' });
    const comments = JSON.parse(jsonData) as Comment[];
    const newId = comments.reduce((a, b) => a + b.id, 0) ; // новый id - сумма всех существующих id
    const newComment = {...req.body, id: newId} as Comment;
    await writeFile(FILE_PATH_COMMENTS, JSON.stringify([...comments, newComment]), { encoding: 'utf8' });
    jsonData = await readFile(FILE_PATH_COMMENTS, { encoding: 'utf8' });
    return res.status(200).json(JSON.parse(jsonData) as Comment[]);

  } catch (err) {
    return res.status(400).json('Comments post error');
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен, мать твою, чего еще тебе надо?');
});
