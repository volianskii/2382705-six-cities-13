import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getOffers = (state: State): OfferType[] => state[NameSpace.Offers].offers;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getActiveCity = (state: State): string => state[NameSpace.Offers].city;
export const getErrorStatus = (state: State): boolean=> state[NameSpace.Offers].hasError;

