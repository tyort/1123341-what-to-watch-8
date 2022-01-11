import { increaseMoviesCount } from '../../store/actions-functions';
import {useDispatch} from 'react-redux';

function ShowMoreScreen(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => dispatch(increaseMoviesCount())}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreScreen;
