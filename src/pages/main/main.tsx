import { Link } from 'react-router-dom';
import LogoScreen from '../../components/logo/logo';
import {Film} from '../../types/film';

type MainScreenProps = {
  jopa?: never; // Не допускаем поле с таким именем
  render: () => JSX.Element;
  films: Film[];
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {films} = props;
  const randomFilm = films[7];
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={randomFilm.background_image} alt={randomFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <LogoScreen isLight={false}/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/Linkvatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to="/" className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={randomFilm.poster_image} alt={`${randomFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{randomFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{randomFilm.genre}</span>
                <span className="film-card__year">{randomFilm.released}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.render()}
    </>
  );
}

export default MainScreen;
