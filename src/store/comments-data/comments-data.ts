import { NameSpace } from '../../constants/store';
import { createSlice } from '@reduxjs/toolkit';
import { addCommentAction, fetchOfferCommentsAction } from '../api-actions';
import { Comment } from '../../types/comment';

const initialState: {
  offerComments: Comment[];
  isFormDisabled: boolean;
  commentsError: boolean;
} = {
  offerComments: [],
  isFormDisabled: false,
  commentsError: false
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.offerComments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.offerComments.push(action.payload);
        state.isFormDisabled = false;
        state.commentsError = false;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isFormDisabled = true;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isFormDisabled = false;
        state.commentsError = true;
      });
  }
});
