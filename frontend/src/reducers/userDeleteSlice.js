import { createSlice } from '@reduxjs/toolkit';

// The user delete reducer and its actions.
export const userDeleteSlice = createSlice({
    name: 'userDelete',
    initialState: {},
    reducers: {
        requestDeleteUser: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearUserDeleteErrors: (state) => {
            state.isDeleted = false;
        },
    },
})

export const {
    requestDeleteUser,
    deleteUserSuccess,
    deleteUserFail,
    clearUserDeleteErrors } = userDeleteSlice.actions;

export default userDeleteSlice.reducer;
