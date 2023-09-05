import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getNearbyOffers = (state: Pick<State, NameSpace.NearbyOffers>): OfferType[] => state[NameSpace.NearbyOffers].nearbyOffers;
