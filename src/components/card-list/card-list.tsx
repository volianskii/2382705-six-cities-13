import Card from '../card/card';
import {useState} from 'react';
import {OfferType} from '../../mocks/offers.ts';

type CardListProps = {
  offers: OfferType[];
};

function CardList({ offers }: CardListProps) {
  const [, setActiveCard] = useState('first');

  const mouseHandler = (hoverCardId: string): void => {
    setActiveCard(hoverCardId);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card offer={offer} key={offer.id} onMouseEnter={mouseHandler} />)}
    </div>
  );
}

export default CardList;
