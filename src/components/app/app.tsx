import MainPage from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Page404 from '../../pages/page404/page404.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import ErrorScreen from '../../pages/error-screen/error-screen.tsx';
import browserHistory from '../../services/browser-history.ts';
import HistoryRouter from '../history-route/history-route.tsx';
import { useEffect } from 'react';
import { store } from '../../store/index.ts';
import { fetchOfferAction, checkAuthAction } from '../../store/api-actions.ts';
import { getErrorStatus, getLoadingStatus } from '../../store/offers-data/selectors.ts';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  useEffect(() => {
    store.dispatch(fetchOfferAction());
    store.dispatch(checkAuthAction());
  }, []);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<Offer />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
