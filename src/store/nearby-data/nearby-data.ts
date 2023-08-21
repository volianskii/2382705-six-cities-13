import { NameSpace } from '../../constants/store';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyOffersAction } from '../api-actions';
import { OfferType } from '../../types/offer';

const initialState: {
  nearbyOffers: OfferType[];
} = {
  nearbyOffers: []
};

export const nearbyData = createSlice({
  name: NameSpace.Nearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});
