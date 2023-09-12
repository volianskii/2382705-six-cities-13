import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Page404 from '../../pages/page404/page404.tsx';
import ErrorPage from '../../pages/error-page/error-page.tsx';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';

import { useAppSelector } from '../../hooks/index.ts';
import PrivateRoute from '../../components/private-route/private-route.tsx';

import { store } from '../../store/index.ts';
import { fetchOfferAction, checkAuthAction, fetchFavoritesAction } from '../../store/api-actions.ts';
import { getErrorStatus, getLoadingStatus } from '../../store/offers-data/selectors.ts';
import { getAuthStatus } from '../../store/user-data/selectors.ts';
import { AuthorizationStatus } from '../../types/authorization.ts';
import { clearFavorites } from '../../store/favorites-data/favorites-data.ts';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  const isAuth = useAppSelector(getAuthStatus);

  useEffect(() => {
    store.dispatch(fetchOfferAction());
    store.dispatch(checkAuthAction());
  }, []);
  useEffect(() => {
    if (isAuth === AuthorizationStatus.Auth) {
      store.dispatch(fetchFavoritesAction());
    } else {
      store.dispatch(clearFavorites());
    }
  }, [isAuth]);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorPage />
    );
  }

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/favorites'
        element={
          <PrivateRoute isAuth={isAuth}>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path='/offer/:id' element={<Offer />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
