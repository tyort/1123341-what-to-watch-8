import { useState, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AppRoute } from '../../const';
import { defaultMoviesCount } from '../../store/actions-functions';
import { Movie } from '../../types/movie';
import PreviewPlayerScreen from '../preview-player/preview-player';

type FilmCardScreenProps = {
  movies: Movie[];
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMoviesCountDefault() {
    dispatch(defaultMoviesCount());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmCardScreenProps;


function FilmCardScreen({movies, onMoviesCountDefault}: ConnectedComponentProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<null | number>(null);
  const [isPlaying, setPlayingStatus] = useState<boolean>(false);
  const history = useHistory();

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
      {movies.map((movie) => {
        const {id, name} = movie;
        return (
          <article
            key={id}
            data-id={id}
            className="small-film-card catalog__films-card"
            onMouseEnter={handleArticleHover}
            onMouseLeave={handleArticleHover}
            onClick={() => {
              onMoviesCountDefault();
              history.push(`${AppRoute.Films}/${id}`);
            }}
          >
            <div className="small-film-card__image">
              <PreviewPlayerScreen
                movie={movie}
                isPlaying={id === activeCardId && isPlaying}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={`${AppRoute.Films}/${id}`}>{name}</Link>
            </h3>
          </article>
        );
      })}
    </>
  );
}

export {FilmCardScreen}; // поможет при тестировании
export default connector(FilmCardScreen); // Связываем наш React-компонент с Redux
