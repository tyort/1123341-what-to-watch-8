import { Link } from 'react-router-dom';
import {genres} from '../../const';

type AllGenresScreenProps = {

}

function AllGenresScreen(props: AllGenresScreenProps): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        const isActive = false;
        return (
          <li key={genre} className={`catalog__genres-item ${isActive && 'catalog__genres-item--active'}`}>
            <Link to="/" className="catalog__genres-link">All genres</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default AllGenresScreen;
