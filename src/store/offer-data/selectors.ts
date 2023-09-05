import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { FullOfferType } from '../../types/offer';

export const getOffer = (state: Pick<State, NameSpace.Offer>): FullOfferType | null => state[NameSpace.Offer].offer;
export const getOfferFoundStatus = (state: Pick<State, NameSpace.Offer>): string => state[NameSpace.Offer].noSuchOfferFound;
