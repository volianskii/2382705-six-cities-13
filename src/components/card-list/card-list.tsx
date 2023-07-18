import Card from '../card/card';
import {MouseEvent, useState} from 'react';

type CardListProps = {
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

function CardList({offers}: CardListProps) {
  const [activeCard, setActiveCard] = useState('first');

  const mouseEnterHandler = (event: MouseEvent) => {
    //relatedTarget?
    //адекватно работает только при наведении на нижние карточки СНИЗУ
    setActiveCard(event.relatedTarget.getAttribute('keyvalue'));
    console.log(activeCard);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <Card offer={offer} keyvalue={keyValue} key={keyValue} onMouseEnter={mouseEnterHandler}/>
        );
      })}
    </div>
  );
}

export default CardList;
