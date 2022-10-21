import {Link} from 'react-router-dom';
import SmallFilmCardScreen from '../small-film-card/small-film-card';
import LogoScreen from '../../components/logo/logo';
import {Film} from '../../types/film';

type MainChildScreenProps = {
  films: Film[];
}

function MainChildScreen({films}: MainChildScreenProps): JSX.Element {
  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <Link to="#" className="catalog__genres-link">All genres</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Comedies</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Crime</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Documentary</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Dramas</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Horror</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Kids &amp; Family</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Romance</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Sci-Fi</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link">Thrillers</Link>
          </li>
        </ul>

        <div className="catalog__films-list">
          <SmallFilmCardScreen/>

          {films.map((film) => {
            const keyValue = `${film.id}-${film.description}`;
            return (
              <article key={keyValue} className="small-film-card catalog__films-card">
                <div className="small-film-card__image">
                  <img src={film.preview_image} alt={film.name} width="280" height="175" />
                </div>
                <h3 className="small-film-card__title">
                  <Link className="small-film-card__link" to="film-page.html">{film.name}</Link>
                </h3>
              </article>
            );
          })}
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <footer className="page-footer">
        <LogoScreen isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainChildScreen;
