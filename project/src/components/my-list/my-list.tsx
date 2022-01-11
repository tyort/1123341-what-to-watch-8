import LogoScreen from '../logo/logo';
import HeaderUserScreen from '../header-user/header-user';
import { fetchFavoritesAction } from '../../store/api-actions-functions';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import FilmCardScreen from '../film-card/film-card';
import { getAllMovies } from '../../store/movies-reducer/selectors';

const FOOTER_AS_WORD = 'footer';

function MyListScreen(): JSX.Element {
  const favoriteMovies = useSelector(getAllMovies).filter((film) => film.is_favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoScreen/>

        <h1 className="page-title user-page__title">My list</h1>

        <HeaderUserScreen/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmCardScreen
            movies={favoriteMovies}
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
  );
}

export default MyListScreen;
