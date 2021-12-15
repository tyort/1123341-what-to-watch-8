/* eslint-disable camelcase */
import {MouseEvent, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Link } from 'react-router-dom';
import LogoScreen from '../logo/logo';
import PreviewPlayerScreen from '../preview-player/preview-player';
import AllGenresScreen from '../all-genres/all-genres';
import ShowMoreScreen from '../show-more/show-more';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { changeGenre } from '../../store/actions-functions';
import { State } from '../../types/state';

const FOOTER_AS_WORD = 'footer';

type MainScreenProps = {

}

// Сопоставление значений свойств стейта хранилища и пропсов React-компонента
const mapStateToProps = ({genre, filteredMovies, isBtnShow}: State) => ({
  genre,
  filteredMovies,
  isBtnShow,
});

// redux добавляет пропсы-функции, влияющие на store, в пропсы компонента, т.к. изменения пропсов перерисовывают React-компонент.
// Dispatch<Actions> - дженерик помогает понять, что диспатчить мы можем только определенные действия.
const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  // вызов в компоненте onGenreChange --> диспатчит changeGenre.
  onGenreChange(genre: string) {
    dispatch(changeGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// ConnectedProps - типизируем пропсы, которые получились при присоединении redux.
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function MainScreen(props: ConnectedComponentProps): JSX.Element {
  const {onGenreChange, genre, filteredMovies, isBtnShow} = props;
  const [activeCardId, setActiveCardId] = useState<null | number>(null);
  const [isPlaying, setPlayingStatus] = useState<boolean>(false);
  let timer: NodeJS.Timeout | null = null ;

  const handleArticleHover = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();

    if (evt.type === 'mouseenter') {
      setActiveCardId(Number(evt.currentTarget.dataset.id));
      timer = setTimeout(() => setPlayingStatus(true), 1000);
    } else if (evt.type === 'mouseleave') {
      setActiveCardId(null);
      setPlayingStatus(false);
      clearTimeout(timer as NodeJS.Timeout);
    }
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <LogoScreen/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href="/">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
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

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <AllGenresScreen
            currentGenre={genre}
            onGenreChange={onGenreChange}
          />

          <div className="catalog__films-list">
            {filteredMovies.map((movie) => {
              const {id, name, preview_image} = movie;
              return (
                <article
                  key={id}
                  data-id={id}
                  className="small-film-card catalog__films-card"
                  onMouseEnter={handleArticleHover}
                  onMouseLeave={handleArticleHover}
                >
                  <div className="small-film-card__image">
                    <PreviewPlayerScreen
                      src={'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm'}
                      poster={preview_image}
                      isPlaying={id === activeCardId && isPlaying}
                    />
                  </div>
                  <h3 className="small-film-card__title">
                    <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
                  </h3>
                </article>
              );
            })}
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

export {MainScreen}; // поможет при тестировании
export default connector(MainScreen); // Связываем наш React-компонент с Redux
