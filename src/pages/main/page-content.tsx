import {Link} from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import LogoScreen from '../../components/logo/logo';
import CatalogFilmsListScreen from '../catalog-films-list/catalog-films-list';
import {Film} from '../../types/film';

type MainChildScreenProps = {
  films: Film[];
}

function MainChildScreen({films}: MainChildScreenProps): JSX.Element {
  const genres = Array.from(new Set(films.map((movie) => movie.genre)));
  const [currentGenre, setCurrentGenre] = useState<string>('All genres');

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          {['All genres', ...genres].map((genre) => (
            <li
              key={genre}
              className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}
              onClick={(evt: MouseEvent<HTMLLIElement>)=> {
                setCurrentGenre(genre);
              }}
            >
              <Link to="#" className="catalog__genres-link">{genre}</Link>
            </li>
          ))}
        </ul>

        <CatalogFilmsListScreen films={films}/>

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
