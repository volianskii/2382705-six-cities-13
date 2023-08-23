import CardMemo from '../card/card';
import { useCallback } from 'react';
import { OfferType } from '../../types/offer.ts';
import { useAppDispatch } from '../../hooks/index.ts';
import { setActiveOfferId } from '../../store/offers-data/offers-data.ts';
import { SortingType } from '../../types/sorting.ts';
import { sorting } from '../../utils/sorting.ts';

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
      <div className={`${listProp} places__list ${tabsProp}`}>
        {sorting[activeSorting](offers).map((offer) => <CardMemo offer={offer} key={offer.id} onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler} type={typeProp} />)}
      </div> :
      <div className={`${listProp} places__list ${tabsProp}`}>
        {offers.map((offer) => <CardMemo offer={offer} key={offer.id} onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler} type={typeProp} />)}
      </div>
  );
}

export default CardList;
