import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/index.ts';
import { fetchFavoritesAction } from '../../store/api-actions.ts';
import { store } from '../../store/index.ts';
import { OfferType } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import { getFavorites } from '../../store/favorites-data/selectors.ts';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';

function Favorites(): JSX.Element {
  const favorites: OfferType[] = useAppSelector(getFavorites);
  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, []);

  return (
    favorites.length !== 0 ?
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <h1>ADD CODE HERE</h1>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div> :
      <FavoritesEmpty />
  );
}

export default Favorites;
