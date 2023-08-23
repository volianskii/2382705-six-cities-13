import { FormEvent, useEffect, useRef } from 'react';
import Logo from '../../components/logo/logo.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { AuthData, AuthorizationStatus } from '../../types/authorization.ts';
import { checkAuthAction, loginAction } from '../../store/api-actions.ts';
import { getAuthStatus } from '../../store/user-data/selectors.ts';
import { useNavigate } from 'react-router-dom';
import { store } from '../../store/index.ts';

function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAuth = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {
    store.dispatch(checkAuthAction());
    if (isAuth === AuthorizationStatus.Auth) {
      navigate('/');
    }
  });

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={submitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
