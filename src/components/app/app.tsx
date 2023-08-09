import MainPage from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Page404 from '../../pages/page404/page404.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {OfferType} from '../../mocks/offers.ts';

type AppProps = {
  offers: OfferType[];
};

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute isAuth>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<Offer offers={offers}/>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
