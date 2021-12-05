import {MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import {genres} from '../../const';

type AllGenresScreenProps = {
  currentGenre: string;
  onGenreChange: (genre: string) => void
}

function AllGenresScreen(props: AllGenresScreenProps): JSX.Element {
  const {currentGenre, onGenreChange} = props;

  const handleGenreClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    if ((evt.target as HTMLLIElement).tagName === 'A' && (evt.target as HTMLLIElement).textContent !== currentGenre) {
      onGenreChange((evt.target as HTMLLIElement).textContent as string);
    }
  };

  return (
    <ul className="catalog__genres-list">
      {[...genres].map((genre) => (
        <li
          key={genre[1]}
          className={`catalog__genres-item ${currentGenre === genre[1] && 'catalog__genres-item--active'}`}
          onClick={handleGenreClick}
        >
          <Link to="/" className="catalog__genres-link">{genre[1]}</Link>
        </li>
      ))}
    </ul>
  );
}

export default AllGenresScreen;
