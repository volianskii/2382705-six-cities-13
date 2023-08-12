import MainPage from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Page404 from '../../pages/page404/page404.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { useEffect } from 'react';
import { store } from '../../store/index.ts';
import { fetchOfferAction } from '../../store/api-actions.ts';

function App(): JSX.Element {

  useEffect(() => {
    store.dispatch(fetchOfferAction());
  }, []);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute isAuth>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<Offer />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
