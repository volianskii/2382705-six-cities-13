import Logo from '../../components/logo/logo.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import {OfferType} from '../../mocks/offers.ts';
import {CITIES} from '../../mocks/city.ts';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {useEffect} from 'react';
import {getOffers} from '../../store/action.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOffers());
  });
  const currentOfferList: OfferType[] = useAppSelector((state) => state.offers);
  const currentCity: string = useAppSelector((state) => state.city);
  const currentCityOfferList = currentOfferList.filter((offer) => offer.city === currentCity);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOfferList.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardList
                offers={currentCityOfferList}
                listProp={'cities__places-list'}
                typeProp={'cities'}
                tabsProp={'tabs__content'}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={CITIES.filter((city) => city.name === currentCity)[0]}
                  offers={currentCityOfferList} selectedOffer={undefined} height={'814px'}
                  width={undefined}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
