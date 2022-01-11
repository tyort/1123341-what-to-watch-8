/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Link, RouteProps, useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NavigationItemTitle } from '../../const';
import { Movie } from '../../types/movie';
import LogoScreen from '../logo/logo';
import MovieNavScreen from '../movie-nav/movie-nav';
import HeaderUserScreen from '../header-user/header-user';
import { changeFavoriteAction, fetchSimilarAction } from '../../store/api-actions-functions';
import {useDispatch, useSelector} from 'react-redux';
import FilmCardScreen from '../film-card/film-card';
import { getSimilarMovies } from '../../store/movies-reducer/selectors';
import { getAuthStatus } from '../../store/user-reducer/selectors';

const FOOTER_AS_WORD = 'footer';

type MovieScreenProps = RouteProps & {
  movie: Movie;
}

function MovieScreen({movie}: MovieScreenProps): JSX.Element {
  const { name, genre, released, poster_image, background_image, background_color} = movie;
  const similarMovies = useSelector(getSimilarMovies);
  const authorizationStatus = useSelector(getAuthStatus);
  const [navItemName, setNavItemName] = useState<string>('Overview');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSimilarAction(movie.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  return (
    <>
      <section className="film-card film-card--full" style={{background: background_color}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={background_image} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <LogoScreen/>

            <HeaderUserScreen/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => history.push(`${AppRoute.Player}/${movie.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => dispatch(changeFavoriteAction(movie.id as number, Number(!movie.is_favorite)))}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={movie.is_favorite ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth
                  &&
                <Link
                  to={`${AppRoute.Films}/${movie.id}/${AppRoute.PostfixReview}`}
                  className="btn film-card__button"
                >
                  Add review
                </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={poster_image} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul
                  className="film-nav__list"
                  onClick={(evt) => {
                    evt.preventDefault();
                    if ((evt.target as HTMLLinkElement).tagName === 'A' && (evt.target as HTMLLinkElement).textContent !== navItemName) {
                      setNavItemName((evt.target as HTMLLinkElement).textContent as string);
                    }
                  }}
                >
                  {
                    Object.values(NavigationItemTitle)
                      .map((item) => (
                        <li key={item} className={`film-nav__item ${navItemName === item && 'film-nav__item--active'}`}>
                          <Link onClick={(evt) => evt.preventDefault()} to="/" className="film-nav__link">{item}</Link>
                        </li>
                      ))
                  }
                </ul>
              </nav>

              <MovieNavScreen
                screenName={navItemName}
                movie={movie}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <FilmCardScreen
              movies={similarMovies}
            />
          </div>
        </section>

        <footer className="page-footer">
          <LogoScreen place={FOOTER_AS_WORD}/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MovieScreen;
