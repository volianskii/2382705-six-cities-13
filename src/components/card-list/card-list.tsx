import Card from '../card/card';
import {useState} from 'react';
import {OfferType} from '../../mocks/offers.ts';

type CardListProps = {
  offers: OfferType[];
};

function CardList({offers}: CardListProps) {
  const [, setActiveCard] = useState('first');

  const mouseHandler = (hoverCardId: string): undefined => {
    setActiveCard(hoverCardId);
    /* console.log(activeCard); */
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <Card offer={offer} key={keyValue} onMouseEnter={mouseHandler}/>
        );
      })}
    </div>
  );
}

export default CardList;
