import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getOffers = (state: Pick<State, NameSpace.Offers>): OfferType[] => state[NameSpace.Offers].offers;
export const getLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getActiveCity = (state: Pick<State, NameSpace.Offers>): string => state[NameSpace.Offers].city;
export const getErrorStatus = (state: Pick<State, NameSpace.Offers>): boolean=> state[NameSpace.Offers].hasError;
export const getActiveOfferId = (state: Pick<State, NameSpace.Offers>): string=> state[NameSpace.Offers].activeOfferId;
