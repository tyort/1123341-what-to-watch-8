import LogoScreen from '../logo/logo';
import HeaderUserScreen from '../header-user/header-user';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFavoritesAction } from '../../store/api-actions-functions';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import FilmCardScreen from '../film-card/film-card';

const FOOTER_AS_WORD = 'footer';

const mapStateToProps = ({favoriteMovies}: State) => ({
  favoriteMovies,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onFavoritesUpload() {
    dispatch(fetchFavoritesAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MyListScreen(props: PropsFromRedux): JSX.Element {
  const {favoriteMovies, onFavoritesUpload} = props;

  useEffect(() => {
    onFavoritesUpload();
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

export {MyListScreen}; // поможет при тестировании
export default connector(MyListScreen); // Связываем наш React-компонент с Redux
