import Logo from '../../components/logo/logo.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {OfferType} from '../../mocks/offers.ts';
import ReviewList from '../../components/review-list/review-list.tsx';
import Map from '../../components/map/map.tsx';
import {CITIES} from '../../mocks/city.ts';
import {useAppSelector} from '../../hooks/index.ts';
import CardList from '../../components/card-list/card-list.tsx';

type OfferProps = {
  offers: OfferType[];
};

function Offer({offers}: OfferProps): JSX.Element {
  const {id} = useParams();
  const [currentOffer, setCurrentOffer] = useState(offers[0]);
  const currentCity = useAppSelector((state) => state.city);
  const currentCityData = CITIES.filter((city) => city.name === currentCity)[0];

  useEffect(() => {
    offers.map((offer) => {
      if(offer.id === id) {
        setCurrentOffer(offer);
      }
    });
  });

  const restOffers = offers.filter((offer) => offer !== currentOffer);

  return (
    <div className="page">
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.premium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> :
                null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.name}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.capacity} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.amenities.map((amenity, amenityId) => {
                    const keyValue = `${amenityId}-amenity`;
                    return (
                      <li className="offer__inside-item" key={keyValue}>
                        {amenity}
                      </li>
                    );
                  }
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.proStatus &&
                    <span className="offer__user-status">
                      Pro
                    </span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.host.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOffer.reviews.length}</span></h2>
                <ReviewList offer={currentOffer} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Map city={currentCityData} offers={restOffers} selectedOffer={null} height={'579px'} width={'1144px'} />
              </div>
            </div>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList
              offers={restOffers}
              listProp={'near-places__list'}
              typeProp={'near-places'}
              tabsProp={'null'}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
