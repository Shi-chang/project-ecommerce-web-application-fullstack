import axios from 'axios';
import {
    requestLoginUser,
    requestRegisterUser,
    requestLoadUser,
    registerUserSuccess,
    loginUserSuccess,
    loadUserSuccess,
    logoutUserFail,
    registerUserFail,
    loginUserFail,
    loadUserFail,
    logoutUserSuccess
} from '../reducers/userAuthenticationSlice';

import {
    requestUpdateProfile,
    requestUpdatePassword,
    requestUpdateUser,
    requestDeleteUser,
    updateProfileSuccess,
    updatePasswordSuccess,
    updateUserSuccess,
    updateProfileFail,
    updatePasswordFail,
    updateUserFail,
    clearUserUpdateErrors
} from '../reducers/userUpdateSlice';

import {
    requestForgotPassword,
    forgotPasswordSuccess,
    forgotPasswordFail,
    clearForgotPasswordErrors
} from '../reducers/userForgotPasswordSlice';

import {
    requestNewPassword,
    newPasswordSuccess,
    newPasswordFail,
    clearResetPasswordErrors
} from '../reducers/userResetPasswordSlice';

import PORT from '../components/route/routeConstants';

// Logs in user by sending the email and password information to the server. If the user
// is successfully logged in, a token sent back by the server will be stored in the
// browser cookies. To get and store the token, it is necessary to put 
//'withCredentials: true'(axios) or 'credentials: include'(fetch) in the request.
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(requestLoginUser())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = `${PORT}/login`;
        const { data } = await axios.post(url, { email, password }, config);
        dispatch(loginUserSuccess(data.user));
    } catch (error) {
        dispatch(loginUserFail(error.response.data.message));
    }
}

// Register a new user by sending the filled out form data to the server. If the user
// is successfully registerred. A token sent back by the server will be stored in the
// browser cookies. To get and store the token, it is necessary to put 
//'withCredentials: true'(axios) or 'credentials: include'(fetch) in the request.
export const register = (formData) => async (dispatch) => {
    try {
        dispatch(requestRegisterUser());
        const url = `${PORT}/register`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(registerUserSuccess(data.user));
        }
    } catch (error) {
        dispatch(registerUserFail(error.message));
    }
}

// Loads the user by sending the token stored in the cookies to the server for authentication.
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(requestLoadUser());
        const config = {
            withCredentials: true
        }
        const url = `${PORT}/me`;
        const { data } = await axios.get(url, config);
        dispatch(loadUserSuccess(data.user));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
}

// Logs out the user and sets the token stored in the local cookies to null.
export const logout = () => async (dispatch) => {
    try {
        const config = {
            withCredentials: true
        }
        const url = `${PORT}/logout`;
        const { data } = await axios.get(url, config);
        dispatch(logoutUserSuccess());
    } catch (error) {
        dispatch(logoutUserFail(error.response.data.message));
    }
}

// Update user profile.
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(requestUpdateProfile());
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        const url = `${PORT}/me/update`;
        const { data } = await axios.put(url, userData, config);
        dispatch(updateProfileSuccess(data.success));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
}

// Update user password.
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(requestUpdatePassword());
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        const url = `${PORT}/password/update`;
        const { data } = await axios.put(url, passwords, config);
        dispatch(updatePasswordSuccess(data.success));
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
}

// Sends forgot password request from the user.
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(requestForgotPassword());
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${PORT}/password/forgot`;
        const { data } = await axios.post(url, email, config);
        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
}

// Sends reset password request from the user.
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(requestNewPassword());
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${PORT}/password/reset/${token}`;
        const { data } = await axios.put(url, passwords, config);
        dispatch(newPasswordSuccess(data.message));
    } catch (error) {
        dispatch(newPasswordFail(error.response.data.message));
    }
}
