import { FormEvent, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, passPattern } from '../../const';
import { loginAction } from '../../store/api-actions-functions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';
import { User } from '../../types/user';
import LogoScreen from '../logo/logo';

const FOOTER_AS_WORD = 'footer';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onUserSubmit(userData: User) {
    dispatch(loginAction(userData));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen(props: PropsFromRedux): JSX.Element {
  const {onUserSubmit, authorizationStatus} = props;
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passInput = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailInput.current !== null && passInput.current !== null && passPattern.test(passInput.current.value)) {
      // eslint-disable-next-line no-console
      console.log(passInput.current);
      onUserSubmit({
        email: emailInput.current.value,
        password: passInput.current.value,
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('неправильный пароль');
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

export {SignInScreen};
export default connector(SignInScreen);
