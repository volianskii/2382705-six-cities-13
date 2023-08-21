import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getFavorites = (state: State): OfferType[] => state[NameSpace.Favorites].favorites;
