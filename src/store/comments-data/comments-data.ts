import { NameSpace } from '../../constants/store';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferCommentsAction } from '../api-actions';
import { Comment } from '../../types/comment';

const initialState: {
  offerComments: Comment[];
} = {
  offerComments: []
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.offerComments = action.payload;
      });
  }
});
