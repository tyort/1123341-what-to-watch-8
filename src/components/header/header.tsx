import {useNavigate} from 'react-router-dom';
import LogoScreen from '../logo/logo';
import LoadingScreen from '../loading/loading';
import { Link } from 'react-router-dom';
import {useAppSelector} from '../../hooks';

function HeaderScreen(): JSX.Element {
  const navigate = useNavigate();
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    <header className={`page-header ${authorizationStatus === 'AUTH' ? 'film-card__head' : ''}`}>
      <LogoScreen isLight={false}/>
      {
        authorizationStatus === 'UNKNOWN' &&
        <div className="user-block">
          <LoadingScreen />
        </div>
      }
      {
        authorizationStatus === 'AUTH' &&
        <ul className="user-block">
          <li className="user-block__item">
            <div
              className="user-block__avatar"
              onClick={() => navigate('/mylist')}
            >
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to="/" className="user-block__link">Sign out</Link>
          </li>
        </ul>
      }
      {
        authorizationStatus === 'NO_AUTH' &&
        <div className="user-block">
          <Link to="/login" className="user-block__link">Sign in</Link>
        </div>
      }
    </header>
  );
}

export default HeaderScreen;
