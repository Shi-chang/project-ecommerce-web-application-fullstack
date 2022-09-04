import { createSlice } from '@reduxjs/toolkit';

// The user reset password reducer and its actions.
export const userResetPasswordSlice = createSlice({
    name: 'userResetPassword',
    initialState: {},
    reducers: {
        requestNewPassword: (state) => {
            state.loading = true;
        },
        newPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        newPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearResetPasswordErrors: (state) => {
            state.error = null;
        },
        clearResetPasswordMessage: (state) => {
            state.message = null;
        },
    },
})

export const {
    requestNewPassword,
    newPasswordSuccess,
    newPasswordFail,
    clearResetPasswordErrors,
    clearResetPasswordMessage } = userResetPasswordSlice.actions;

export default userResetPasswordSlice.reducer;
