import { NameSpace } from '../../constants/store';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoritesAction } from '../api-actions';
import { OfferType } from '../../types/offer';

const initialState: {
  favorites: OfferType[];
} = {
  favorites: []
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  }
});
