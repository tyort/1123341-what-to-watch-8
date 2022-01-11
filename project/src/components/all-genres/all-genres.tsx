import {MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { changeGenre } from '../../store/actions-functions';
import { getAllGenres, getCurrentGenre } from '../../store/movies-reducer/selectors';

function AllGenresScreen(): JSX.Element {
  const currentGenre = useSelector(getCurrentGenre);
  const allGenres = useSelector(getAllGenres);
  const dispatch = useDispatch();

  const handleGenreClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    if ((evt.target as HTMLLIElement).tagName === 'A' && (evt.target as HTMLLIElement).textContent !== currentGenre) {
      dispatch(changeGenre((evt.target as HTMLLIElement).textContent as string));
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
