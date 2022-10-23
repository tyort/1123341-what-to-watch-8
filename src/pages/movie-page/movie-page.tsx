/* eslint-disable camelcase */
import { Link, useParams } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import MoviePageChildScreenProps from './page-content';
import { Film } from '../../types/film';
import CatalogFilmsListScreen from '../catalog-films-list/catalog-films-list';

type MoviePageScreenProps = {
  jopa?: never; // Не допускаем поле с таким именем
  films: Film[];
}

function MoviePageScreen({films}: MoviePageScreenProps): JSX.Element {
  const {movieId} = useParams();
  const currentMovie: Film | undefined = films.find((movie) => movie.id.toString() === movieId);
  const {background_image, name, genre, released, poster_image} = currentMovie as Film;
  const [menuItem, setMenuItem] = useState<string>('Overview');

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={background_image} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to="/" className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to="add-review.html" className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={poster_image} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  {['Overview', 'Details', 'Reviews'].map((menuName) => (
                    <li key={menuName} className={`film-nav__item ${menuName === menuItem ? 'film-nav__item--active' : ''}`}>
                      <Link
                        onClick={(evt: MouseEvent<HTMLAnchorElement>)=> {
                          evt.preventDefault();
                          setMenuItem(menuName);
                        }}
                        to="#"
                        className="film-nav__link"
                      >{menuName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <MoviePageChildScreenProps menuItem={menuItem}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CatalogFilmsListScreen films={films.slice(0, 4)}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MoviePageScreen;
