import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoScreen from '../logo/logo';
import HeaderUserScreen from '../header-user/header-user';
import AllGenresScreen from '../all-genres/all-genres';
import ShowMoreScreen from '../show-more/show-more';
import { AppRoute } from '../../const';
import { changeGenre, defaultMoviesCount } from '../../store/actions-functions';
import { changeFavoriteAction } from '../../store/api-actions-functions';
import FilmCardScreen from '../film-card/film-card';
import { getCurrentGenre, getAllGenres, getFilteredMovies, getBtnAppearance, getPromo } from '../../store/movies-reducer/selectors';

const FOOTER_AS_WORD = 'footer';

function MainScreen(): JSX.Element {
  const genre = useSelector(getCurrentGenre);
  const allGenres = useSelector(getAllGenres);
  const filteredMovies = useSelector(getFilteredMovies);
  const isBtnShow = useSelector(getBtnAppearance);
  const promo = useSelector(getPromo);
  const bgColor = promo?.background_color;
  const history = useHistory();

  const dispatch = useDispatch();

  const onGenreChange = (currentGenre: string) => {
    dispatch(changeGenre(currentGenre));
  };

  return (
    <>
      <section className="film-card" style={{background: bgColor}}>
        <div className="film-card__bg">
          <img src={promo?.background_image} alt={promo?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <LogoScreen/>

          <HeaderUserScreen/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo?.poster_image} alt={`${promo?.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo?.genre}</span>
                <span className="film-card__year">{promo?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => {
                    dispatch(defaultMoviesCount());
                    history.push(`${AppRoute.Player}/${promo?.id as number}`);
                  }}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => dispatch(changeFavoriteAction(promo?.id as number, Number(!promo?.is_favorite)))}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={promo?.is_favorite ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <AllGenresScreen
            allGenres={allGenres}
            currentGenre={genre}
            onGenreChange={onGenreChange}
          />

          <div className="catalog__films-list">
            <FilmCardScreen
              movies={filteredMovies}
            />
          </div>

          {isBtnShow && <ShowMoreScreen/>}
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

export default MainScreen;
