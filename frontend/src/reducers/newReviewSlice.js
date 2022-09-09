import { createSlice } from '@reduxjs/toolkit';

// The new review reducer and its actions.
export const newReviewSlice = createSlice({
    name: 'new review',
    initialState: {},
    reducers: {
        requestNewReview: (state) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        newReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetNewReview: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        clearNewReviewErrors: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
})

export const { requestNewReview,
    newReviewSuccess,
    newReviewFail,
    resetNewReview,
    clearNewReviewErrors } = newReviewSlice.actions;

export default newReviewSlice.reducer;