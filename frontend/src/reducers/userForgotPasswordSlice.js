import { createSlice } from '@reduxjs/toolkit';

// The user forgot password reducer and its actions.
export const userForgotPasswordSlice = createSlice({
    name: 'userForgotPassword',
    initialState: {},
    reducers: {
        requestForgotPassword: (state) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearForgotPasswordErrors: (state) => {
            state.error = null;
        },
        clearForgotPasswordMessage: (state) => {
            state.message = null;
        },
    },
})

export const {
    requestForgotPassword,
    forgotPasswordSuccess,
    forgotPasswordFail,
    clearForgotPasswordErrors,
    clearForgotPasswordMessage } = userForgotPasswordSlice.actions;

export default userForgotPasswordSlice.reducer;
