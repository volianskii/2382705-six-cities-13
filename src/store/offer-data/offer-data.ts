import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants/store';
import { fetchFullOfferAction } from '../api-actions';
import { FullOfferType } from '../../types/offer';

const initialState: {
  offer: FullOfferType | null;
} = {
  offer: null
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      });
  }
});
