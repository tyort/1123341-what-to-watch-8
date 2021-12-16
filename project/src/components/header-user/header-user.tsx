import {MouseEvent} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions-functions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({authorizationStatus, currentUser}: State) => ({
  authorizationStatus,
  currentUser,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onUserLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function HeaderUserScreean(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, currentUser, onUserLogout} = props;

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    onUserLogout();
  };

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
            <Link
              className="user-block__link"
              to={AppRoute.Main}
              onClick={handleLinkClick}
            >
              Sign out
            </Link>
          </li>
        </ul>
      );
    default:
      return (
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>
      );
  }
}

export {HeaderUserScreean}; // поможет при тестировании
export default connector(HeaderUserScreean); // Связываем наш React-компонент с Redux
