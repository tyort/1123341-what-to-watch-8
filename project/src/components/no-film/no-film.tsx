import {Link} from 'react-router-dom';

function NoMovieScreen(): JSX.Element {
  return (
    <section className="no-movie__screen">
      <h1>Movie doesn`t exist</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}

export default NoMovieScreen;
