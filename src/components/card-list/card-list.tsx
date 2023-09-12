import { useCallback } from 'react';

import CardMemo from '../card/card';
import { useAppDispatch } from '../../hooks/index.ts';
import { setActiveOfferId } from '../../store/offers-data/offers-data.ts';
import { sorting } from '../../utils/sorting.ts';

import { OfferType } from '../../types/offer.ts';
import { SortingType } from '../../types/sorting.ts';

type CardListProps = {
  offers: OfferType[];
  listProp: string;
  typeProp: string;
  tabsProp: string;
  activeSorting?: SortingType;
};

function CardList({offers, listProp, typeProp, tabsProp, activeSorting}: CardListProps) {
  const dispatch = useAppDispatch();
  const mouseEnterHandler = useCallback((hoverCardId: string): void => {
    dispatch(setActiveOfferId(hoverCardId));
  }, [dispatch]);
  const mouseLeaveHandler = useCallback((): void => {
    dispatch(setActiveOfferId(null));
  }, [dispatch]);

  return (
    activeSorting ?
      <div className={`${listProp} places__list ${tabsProp}`} data-testid='cardListComponent'>
        {sorting[activeSorting](offers).map((offer) => <CardMemo offer={offer} key={offer.id} onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler} type={typeProp} />)}
      </div> :
      <div className={`${listProp} places__list ${tabsProp}`} data-testid='cardListComponent'>
        {offers.map((offer) => <CardMemo offer={offer} key={offer.id} onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler} type={typeProp} />)}
      </div>
  );
}

export default CardList;
