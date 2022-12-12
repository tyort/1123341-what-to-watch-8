import {Link} from 'react-router-dom';
import { MouseEvent, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import LogoScreen from '../../components/logo/logo';
import {getMoviesByGenre, changeGenre, getMoviesCount} from '../../store/action';
import CatalogFilmsListScreen from '../catalog-films-list/catalog-films-list';

function MainChildScreen(): JSX.Element {
  const {genre, genres, filmsCount, films, showButton} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onGenreChange = (selectedGenre: string) => {
    dispatch(changeGenre({genre: selectedGenre}));
    dispatch(getMoviesByGenre());
    dispatch(getMoviesCount({isCountReset: true}));
  };

  useEffect(() => {
    dispatch(getMoviesCount({isCountReset: true}));
  }, []);

  const onMoviesCountChange = () => {
    dispatch(getMoviesCount({isCountReset: false}));
  };

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          {genres.map((item) => (
            <li
              key={item}
              className={`catalog__genres-item ${genre === item ? 'catalog__genres-item--active' : ''}`}
              onClick={(evt: MouseEvent<HTMLLIElement>)=> {
                onGenreChange(item);
              }}
            >
              <Link to="#" className="catalog__genres-link">{item}</Link>
            </li>
          ))}
        </ul>

        <CatalogFilmsListScreen films={films.slice(0, filmsCount)}/>

        {showButton &&
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={(evt: MouseEvent<HTMLButtonElement>)=> {
              onMoviesCountChange();
            }}
          >
            Show more
          </button>
        </div>}

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
