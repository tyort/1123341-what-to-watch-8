import {MouseEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions-functions';
import { getAuthStatus, getDataUser } from '../../store/user-reducer/selectors';

function HeaderUserScreean(): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const currentUser = useSelector(getDataUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  switch (authorizationStatus) {
    case AuthorizationStatus.Auth:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src={currentUser?.avatar_url}
                alt="User avatar"
                width="63"
                height="63"
                onClick={() => history.push(AppRoute.MyList)}
              />
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

export default HeaderUserScreean;
