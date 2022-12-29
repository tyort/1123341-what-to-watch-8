import { FormEvent, createRef, RefObject, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import LogoScreen from '../../components/logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { fetchAuthAction } from '../../store/api-actions';

// Мы можем по-разному обработать пользовательский ввод в Форму:
//   1) ref-объект(методом createRef) Вместо value ставим атрибут defaultValue.
//      Данные c DOM-элемента получаем через FormData по атрибуту name;
//   2) setState. Данные c DOM-элемента получаем через evt.target.value;
//   3) useRef для каждого input

function SignInScreen(): JSX.Element {
  const navigate = useNavigate();
  const {authorizationStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // это просто объект, у которого есть свойство "current", в котором естьссылка на DOM-элемент;
  const inputRef: RefObject<HTMLFormElement> = createRef();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const formData = new FormData(inputRef.current as HTMLFormElement);
    dispatch(fetchAuthAction({
      email: formData.get('user-email') as string,
      password: formData.get('user-password') as string
    }));
  };

  useEffect(() => {
    authorizationStatus === 'AUTH' && navigate('/');
  }, [authorizationStatus]);

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
                defaultValue={'chic@mail.ru'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                defaultValue={'222'}
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
        <LogoScreen isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInScreen;
