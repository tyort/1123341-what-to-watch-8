import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { dropToken } from '../../services/token';
import { setAuthorizationStatus } from '../../store/action';
import LoadingScreen from '../loading/loading';
import LogoScreen from '../logo/logo';

type HeaderScreenProps = {
  currentScreen: 'AddReview' | 'UserPage' | 'Other';
}

function HeaderScreen({currentScreen}: HeaderScreenProps): JSX.Element {
  let AdditionlaClass = '';

  switch(currentScreen) {
    case 'AddReview':
      break;
    case 'UserPage':
      AdditionlaClass = 'user-page__head';
      break;
    default:
      AdditionlaClass = 'film-card__head';
      break;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    <header className={`page-header ${AdditionlaClass}`}>
      <LogoScreen isLight={false} />
      {currentScreen === 'UserPage' && <h1 className="page-title user-page__title">My list</h1>}
      {
        currentScreen === 'AddReview' &&
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  to="/"
                  onClick={(e)=> e.preventDefault()}
                  className="breadcrumbs__link"
                >
                  Add review
                </Link>
              </li>
            </ul>
          </nav>
      }

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
            <div className="user-block__avatar" onClick={() => navigate('/mylist')}>
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link
              to="/"
              className="user-block__link"
              onClick={() => {
                dropToken();
                dispatch(setAuthorizationStatus('NO_AUTH'));
              }}
            >
              Sign out
            </Link>
          </li>
        </ul>
      }

      {
        authorizationStatus === 'NO_AUTH' && currentScreen === 'UserPage' &&
        <h1 className="page-title user-page__title">Sign in</h1>
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
