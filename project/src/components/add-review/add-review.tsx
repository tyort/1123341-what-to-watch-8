import LogoScreen from '../logo/logo';
import HeaderUserScreen from '../header-user/header-user';
import { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type AddReviewScreenProps = {
  renderRating: (movieId: number) => JSX.Element;
  movie: Movie;
}

function AddReviewScreen(props: AddReviewScreenProps): JSX.Element {
  const {renderRating, movie} = props;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.background_image} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <LogoScreen/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link" onClick={(evt) => evt.preventDefault()}>Add review</Link>
              </li>
            </ul>
          </nav>

          <HeaderUserScreen/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movie.poster_image} alt={movie.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        {renderRating(movie.id)}
      </div>

    </section>
  );
}

export default AddReviewScreen;

