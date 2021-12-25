import {MouseEvent} from 'react';
import { Link } from 'react-router-dom';

type AllGenresScreenProps = {
  allGenres: string[];
  currentGenre: string;
  onGenreChange: (genre: string) => void
}

function AllGenresScreen(props: AllGenresScreenProps): JSX.Element {
  const {currentGenre, onGenreChange, allGenres} = props;

  const handleGenreClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    if ((evt.target as HTMLLIElement).tagName === 'A' && (evt.target as HTMLLIElement).textContent !== currentGenre) {
      onGenreChange((evt.target as HTMLLIElement).textContent as string);
    }
  };

  return (
    <ul className="catalog__genres-list">
      {allGenres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
          onClick={handleGenreClick}
        >
          <Link to="/" className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default AllGenresScreen;
