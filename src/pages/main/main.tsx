import CardList from '../../components/card-list/card-list.tsx';
import { CITIES } from '../../constants/city.ts';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import Header from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { OfferType } from '../../types/offer.ts';
import { getActiveCity, getActiveOfferId, getOffers } from '../../store/offers-data/selectors.ts';
import MainPageEmpty from '../../components/main-empty/main-empty.tsx';

function MainPage(): JSX.Element {

  const currentOfferList = useAppSelector(getOffers);
  const currentCity = useAppSelector(getActiveCity);
  const currentCityData = CITIES.filter((city) => city.name === currentCity)[0];
  const currentCityOfferList: OfferType[] = currentOfferList.filter((offer) => offer.city.name === currentCity);
  const activeOfferId = useAppSelector(getActiveOfferId);
  let activeOffer = null;
  if (activeOfferId !== null) {
    activeOffer = currentCityOfferList.filter((offer) => offer.id === activeOfferId)[0];
  }
  return (
    <div className="page page--gray page--main">
      <Header />
      {currentCityOfferList.length !== 0 ?
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
                <section className="cities__map map" style={{backgroundImage: 'none'}}>
                  <Map
                    city={currentCityData}
                    offers={currentCityOfferList} selectedOffer={activeOffer} height={'814px'}
                    width={''}
                  />
                </section>
              </div>
            </div>
          </div>
        </main> :
        <MainPageEmpty city={currentCity}/>}
    </div>
  );
}

export default MainPage;
