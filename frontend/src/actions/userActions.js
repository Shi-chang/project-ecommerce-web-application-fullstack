import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_USER_ERRORS
} from '../reducers/userSlice.js';
import axios from 'axios';

// Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(LOGIN_REQUEST())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = 'http://localhost:4000/api/v1/login';
        const { data } = await axios.post(url, { email, password }, config)
        dispatch(LOGIN_SUCCESS(data.user));
    } catch (error) {
        dispatch(LOGIN_FAIL(error.message));
    }
}

// Register user
export const register = (formData) => async (dispatch) => {
    try {
        dispatch(REGISTER_USER_REQUEST());
        const url = `http://localhost:4000/api/v1/register`;
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
            dispatch(REGISTER_USER_SUCCESS(data.user));
        }
    } catch (error) {
        console.dir(error);
        dispatch(REGISTER_USER_FAIL(error.message));
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(LOAD_USER_REQUEST());
        const config = {
            withCredentials: true
        }
        const url = `http://localhost:4000/api/v1/me`;
        const { data } = await axios.get(url, config);
        dispatch(LOAD_USER_SUCCESS(data.user));
    } catch (error) {
        dispatch(LOAD_USER_FAIL(error.message));
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        const config = {
            withCredentials: true
        }
        const url = `http://localhost:4000/api/v1/logout`;
        const { data } = await axios.get(url, config);
        console.dir(data);
        dispatch(LOGOUT_SUCCESS());
    } catch (error) {
        dispatch(LOGOUT_FAIL(error.message));
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_USER_ERRORS());
};
