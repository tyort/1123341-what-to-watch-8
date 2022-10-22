import {Film} from '../../types/film';
import { Link } from 'react-router-dom';
import {MouseEvent} from 'react';

type SmallFilmCardScreenProps = {
  id?: never;
  film: Film;
  getHoveredFilm: (movie: Film | null) => void;
}

function SmallFilmCardScreen({film, getHoveredFilm}: SmallFilmCardScreenProps): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={(evt: MouseEvent<HTMLElement>):void => {
        getHoveredFilm(film);
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>):void => {
        getHoveredFilm(null);
      }}
    >
      <div className="small-film-card__image">
        <img src={film.preview_image} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/">{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCardScreen;
