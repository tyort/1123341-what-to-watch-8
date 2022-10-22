import SmallFilmCardScreen from '../small-film-card/small-film-card';
import {Film} from '../../types/film';
import {useState} from 'react';

type CatalogFilmsListScreenProps = {
  films: Film[];
}

function CatalogFilmsListScreen({films}: CatalogFilmsListScreenProps): JSX.Element {
  const [hoveredFilm, setHoveredFilm] = useState<Film | null>(null);
  console.log(hoveredFilm);

  const getHoveredFilm = (movie: Film | null) => {
    setHoveredFilm(movie);
  };

  return(
    <div className="catalog__films-list">
      {films.map((film) => {
        const keyValue = `${film.id}-${film.description}`;
        return (
          <SmallFilmCardScreen
            key={keyValue}
            film={film}
            getHoveredFilm={getHoveredFilm}
          />
        );
      })}
    </div>
  );
}

export default CatalogFilmsListScreen;
