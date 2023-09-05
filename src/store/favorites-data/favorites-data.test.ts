import { makeFakeOffer } from '../../utils/mocks';
import { addFavoritesAction, deleteFavoritesAction, fetchFavoritesAction } from '../api-actions';
import { clearFavorites, favoritesData } from './favorites-data';

describe ('favorites-data slice', () => {
  const emptyAction = {type: ''};
  const mockFavoriteOffer = makeFakeOffer();
  it ('should return initial state with empty action', () => {
    const expectedState = {
      favorites: [],
    };

    const result = favoritesData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const expectedState = {
      favorites: [],
    };

    const result = favoritesData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set favorites to an empty array with "clearFavorites" action', () => {
    const expectedFavoritesArray = [];
    const state = {
      favorites: [mockFavoriteOffer],
    };

    const result = favoritesData.reducer(state, clearFavorites);
    expect(result.favorites).toEqual(expectedFavoritesArray);
  });

  it ('should set favorites to an array with a favorite offer with "fetchFavoritesAction.fulfilled" action', () => {
    const expectedState = {
      favorites: [mockFavoriteOffer],
    };

    const result = favoritesData.reducer(undefined, fetchFavoritesAction.fulfilled([mockFavoriteOffer], '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should expand favorites with a favorite offer with "addFavoritesAction.fulfilled" action', () => {
    const expectedState = {
      favorites: [mockFavoriteOffer],
    };

    const result = favoritesData.reducer(undefined, addFavoritesAction.fulfilled(mockFavoriteOffer, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should remove favorite offer from favorites with "deleteFavoritesAction.fulfilled" action', () => {
    const expectedState = {
      favorites: [],
    };
    const state = {
      favorites: [mockFavoriteOffer],
    };

    const result = favoritesData.reducer(state, deleteFavoritesAction.fulfilled(mockFavoriteOffer, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
