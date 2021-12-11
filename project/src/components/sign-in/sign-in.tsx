import { FormEvent, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loginAction } from '../../store/api-actions-functions';
import { ThunkAppDispatch } from '../../types/action';
import { User } from '../../types/user';
import LogoScreen from '../logo/logo';

type SignInScreenProps = {

}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onUserSubmit(userData: User) {
    dispatch(loginAction(userData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SignInScreenProps;

function SignInScreen(props: ConnectedComponentProps): JSX.Element {
  const {onUserSubmit} = props;
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passInput = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailInput.current !== null && passInput.current !== null) {
      onUserSubmit({
        email: emailInput.current.value,
        password: passInput.current.value,
      });
    }
  };

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
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export {SignInScreen};
export default connector(SignInScreen);
