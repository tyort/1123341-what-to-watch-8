import { FormEvent, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, passPattern, ResponseText } from '../../const';
import { loginAction } from '../../store/api-actions-functions';
import { getAuthStatus } from '../../store/user-reducer/selectors';
import LogoScreen from '../logo/logo';
import {toast} from 'react-toastify';

const FOOTER_AS_WORD = 'footer';

function SignInScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passInput = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailInput.current !== null && passInput.current !== null && passPattern.test(passInput.current.value)) {
      dispatch(loginAction({
        email: emailInput.current.value,
        password: passInput.current.value,
      }));
    } else {
      toast.info(ResponseText.PassFail);
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Redirect to={AppRoute.Main} />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoScreen/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleFormSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailInput}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="user-email"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passInput}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="user-password"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <LogoScreen place={FOOTER_AS_WORD}/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInScreen;
