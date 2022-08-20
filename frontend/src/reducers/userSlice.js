import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOAD_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        LOAD_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        LOGOUT_FAIL: (state, action) => {
            state.error = action.payload;
        },
        REGISTER_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        LOAD_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        LOGOUT_SUCCESS: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        CLEAR_USER_ERRORS: (state) => {
            state.error = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { LOGIN_REQUEST, REGISTER_USER_REQUEST, LOAD_USER_REQUEST, REGISTER_USER_SUCCESS, LOGIN_SUCCESS, LOAD_USER_SUCCESS, LOGOUT_FAIL, REGISTER_USER_FAIL, LOGIN_FAIL, LOAD_USER_FAIL, LOGOUT_SUCCESS, CLEAR_USER_ERRORS } = userSlice.actions

export default userSlice.reducer