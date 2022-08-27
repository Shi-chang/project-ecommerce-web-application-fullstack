import { createSlice } from '@reduxjs/toolkit';

// The user authentication reducer and its actions.
export const userAuthenticationSlice = createSlice({
    name: 'userAuthentication',
    initialState: {
        user: null
    },
    reducers: {
        requestLoginUser: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        requestRegisterUser: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        requestLoadUser: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutUserFail: (state, action) => {
            state.error = action.payload;
        },
        registerUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        loginUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutUserSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        clearUserAuthenticationErrors: (state) => {
            state.error = null;
        },
    },
})

export const { requestLoginUser,
    requestRegisterUser,
    requestLoadUser,
    registerUserSuccess,
    loginUserSuccess,
    loadUserSuccess,
    logoutUserFail,
    registerUserFail,
    loginUserFail,
    loadUserFail,
    logoutUserSuccess,
    clearUserAuthenticationErrors } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
