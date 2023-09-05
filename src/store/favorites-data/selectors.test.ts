import { NameSpace } from '../../constants/store';
import { makeFakeOffer } from '../../utils/mocks';
import { getFavorites } from './selectors';

describe ('commentsData selectors', () => {
  const state = {
    [NameSpace.Favorites]: {
      favorites: new Array(3).fill(null).map(() => makeFakeOffer()),
    }
  };

  it ('should return favorites from store', () => {
    const { favorites } = state[NameSpace.Favorites];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });
});
