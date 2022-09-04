import { createSlice } from '@reduxjs/toolkit';
// This component handles the user update operations, including user profile, password.

// The user update reducer and its actions.
export const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {},
    reducers: {
        requestUpdateProfile: (state) => {
            state.loading = true;
        },
        requestUpdatePassword: (state) => {
            state.loading = true;
        },
        requestUpdateUser: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetUpdateProfile: (state) => {
            state.isUpdated = false;
        },
        resetUpdatePassword: (state) => {
            state.isUpdated = false;
        },
        resetUpdateUser: (state) => {
            state.loading = false;
        },
        clearUserUpdateErrors: (state) => {
            state.error = null;
        },
    },
})

export const { requestUpdateProfile,
    requestUpdatePassword,
    requestUpdateUser,

    updateProfileSuccess,
    updatePasswordSuccess,
    updateUserSuccess,

    updateProfileFail,
    updatePasswordFail,
    updateUserFail,

    resetUpdateProfile,
    resetUpdatePassword,
    resetUpdateUser,

    clearUserUpdateErrors } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
