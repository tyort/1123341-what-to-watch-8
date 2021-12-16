import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({authorizationStatus, currentUser}: State) => ({
  authorizationStatus,
  currentUser,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function HeaderUserScreean(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, currentUser} = props;

  switch (authorizationStatus) {
    case AuthorizationStatus.Auth:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={currentUser?.avatar_url} alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to="/">Sign out</Link>
          </li>
        </ul>
      );
    default:
      return (
        <div className="user-block">
          <Link to="/" className="user-block__link">Sign in</Link>
        </div>
      );
  }
}

export {HeaderUserScreean}; // поможет при тестировании
export default connector(HeaderUserScreean); // Связываем наш React-компонент с Redux
