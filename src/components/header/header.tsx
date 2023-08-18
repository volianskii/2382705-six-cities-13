import Logo from '../logo/logo';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { useDispatch } from 'react-redux';
import { getAuthStatus, getUserInfo } from '../../store/user-data/selectors';
import { AuthorizationStatus } from '../../types/authorization.ts';
import { getFavorites } from '../../store/favorites-data/selectors.ts';

function Header(): JSX.Element {
  const isAuth = useAppSelector(getAuthStatus);
  const user = useAppSelector(getUserInfo);
  const favorites = useAppSelector(getFavorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOutClickHandler = () => {
    dispatch(logoutAction());
  };
  const emailClickHandler = () => {
    navigate('/favorites');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth !== AuthorizationStatus.Auth
                ?
                <li className="header__nav-item user">
                  <Link to='/login' className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
                :
                <>
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#" onClick={emailClickHandler}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </a>
                  </li>
                  <li className="header__nav-item" onClick={signOutClickHandler}>
                    <Link to='' className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
