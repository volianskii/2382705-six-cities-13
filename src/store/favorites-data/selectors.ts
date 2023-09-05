import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getFavorites = (state: Pick<State, NameSpace.Favorites>): OfferType[] => state[NameSpace.Favorites].favorites;
