import { MouseEventHandler } from 'react';
import {Link} from 'react-router-dom';
type CardProps = {
  offer: {
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
  };
  key: string;
  keyvalue: string;
  onMouseEnter: MouseEventHandler;
};

function Card({offer, key, keyvalue, onMouseEnter}: CardProps): JSX.Element {
  return (
    //обертка для relatedTarget
    <div keyvalue={keyvalue}>
      <article className="cities__card place-card" key={key} onMouseEnter={onMouseEnter}>
        {offer.premium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> :
          null}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href='#'>
            <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: '80%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link
              to={{
                pathname: '/offer/:id',
                state: {offer: true},
              }}
            >
              {offer.name}
            </Link>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </div>
  );
}

export default Card;
