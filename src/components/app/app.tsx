import MainPage from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Page404 from '../../pages/page404/page404.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

type AppProps = {
  cardsCount: number;
  offers: {
    price: number;
    name: string;
    id: string;
    rating: number;
    type: 'apartment'|'house'|'hotel'|'hostel';
    capacity: number;
    bedrooms: number;
    amenities: string[];
    premium: boolean;
    host: {
      name: string;
      photo: string;
      description: string;
    };
    reviews: {
      name: string;
      photo: string;
      rating: number;
      review: string;
      date: {
        month: 'June'|'July'|'August';
        year: number;
      };
    }[];
  }[];
};

function App({cardsCount, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage cardsCount={cardsCount} offers={offers}/>} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute isAuth>
              <Favorites offers={offers}/>
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
