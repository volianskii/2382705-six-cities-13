import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { FullOfferType } from '../../types/offer';

export const getOffer = (state: State): FullOfferType | null => state[NameSpace.Offer].offer;
