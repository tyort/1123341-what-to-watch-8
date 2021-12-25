import { bindActionCreators, Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { increaseMoviesCount } from '../../store/actions-functions';
import { connect, ConnectedProps } from 'react-redux';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onMoviesCountIncrease: increaseMoviesCount,
}, dispatch);

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ShowMoreScreen({onMoviesCountIncrease}: PropsFromRedux): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onMoviesCountIncrease}
      >
        Show more
      </button>
    </div>
  );
}

export {ShowMoreScreen};
export default connector(ShowMoreScreen);
