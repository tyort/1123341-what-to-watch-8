import { FormEvent, createRef, RefObject } from 'react';
import LogoScreen from '../../components/logo/logo';

function SignInScreen(): JSX.Element {
  // это просто объект, у которого есть свойство "current", в котором естьссылка на DOM-элемент;
  const inputRef: RefObject<HTMLFormElement> = createRef();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const tyort = new FormData(inputRef.current as HTMLFormElement).get('user-email');
    console.log(tyort);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoScreen isLight={false}/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          onSubmit={handleSubmit}
          ref={inputRef} // атрибут ref у React-элемента для связи с DOM-элементом
          action="#"
          className="sign-in__form"
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email" placeholder="Email address"
                name="user-email"
                id="user-email"
                defaultValue={'Что-там такое пиздатое'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <LogoScreen isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInScreen;
