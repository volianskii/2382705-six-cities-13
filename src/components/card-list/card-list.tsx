import CardMemo from '../card/card';
import { useCallback, useState } from 'react';
import { OfferType } from '../../types/offer.ts';

type CardListProps = {
  offers: OfferType[];
  listProp: string;
  typeProp: string;
  tabsProp: string;
};

function CardList({offers, listProp, typeProp, tabsProp}: CardListProps) {
  const [, setActiveCard] = useState('first');

  const mouseHandler = useCallback((hoverCardId: string): void => {
    setActiveCard(hoverCardId);
  }, []);

  return (
    <div className={`${listProp} places__list ${tabsProp}`}>
      {offers.map((offer) => <CardMemo offer={offer} key={offer.id} onMouseEnter={mouseHandler} type={typeProp} />)}
    </div>
  );
}

export default CardList;
