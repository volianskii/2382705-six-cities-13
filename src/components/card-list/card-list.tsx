import Card from '../card/card';
import {useState} from 'react';
import {OfferType} from '../../types/offer.ts';

type CardListProps = {
  offers: OfferType[];
  listProp: string;
  typeProp: string;
  tabsProp: string;
};

function CardList({offers, listProp, typeProp, tabsProp}: CardListProps) {
  const [, setActiveCard] = useState('first');

  const mouseHandler = (hoverCardId: string): void => {
    setActiveCard(hoverCardId);
  };

  return (
    <div className={`${listProp} places__list ${tabsProp}`}>
      {offers.map((offer) => <Card offer={offer} key={offer.id} onMouseEnter={mouseHandler} type={typeProp} />)}
    </div>
  );
}

export default CardList;
