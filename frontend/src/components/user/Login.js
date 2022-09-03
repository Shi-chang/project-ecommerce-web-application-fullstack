import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { login } from '../../actions/userActions';
import { clearUserAuthenticationErrors } from '../../reducers/userAuthenticationSlice';
import GoogleAuth from './GoogleAuth';

// The Login component that handles the login process.
const Login = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, isAuthenticated, error } = useSelector(state => state.user);

    // If the user is successfully authenticated, navigate to the home page. If there
    // is an error other than the one created by automatic login, show the error message.
    // The error in the store will be cleared after every render.
    useEffect(() => {
        if (isAuthenticated) {
            nagivate('/');
        }

        // When the user goes to the home page, autumatically try to login the user using
        // the token stored in the browser cookies, if any; if the there is no token, the 
        // automatic login will fail and will create an error with message = "You need to 
        // login to access this page." This message will not be displayed, and only other
        // errors will be displayed to provide information to the user.
        if (error && error.toString() !== "You need to login to access this page.") {
            alert(error);
        }
        dispatch(clearUserAuthenticationErrors());
    }, [dispatch, error, isAuthenticated, nagivate]);

    // Handles form submt.
    const handleSumbit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    // If the page is loading, show the Loader; otherwise, show the login form.
    return (
        <div>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Log in'} />
                    <div className="row wrapper">
                        <div id='login-content'>
                            <form className="shadow-lg" onSubmit={handleSumbit}>
                                <h2 className="mb-3 text-center">Login</h2>
                                <div className="form-group">
                                    <label htmlFor="email-field">Email</label>
                                    <input
                                        type="email"
                                        id="email-field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password-field">Password</label>
                                    <input
                                        type="password"
                                        id="password-field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <>
                                    <GoogleAuth />
                                </>
                                <div className='d-flex justify-content-center'>
                                    <button
                                        id="login-btn"
                                        type="submit"
                                        className=" btn mt-3"
                                    >
                                        Login
                                    </button>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <Link to="/password/forgot" className="float-right mt-3">Forgot Password?</Link>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Link to="/register" className="float-right mt-3">Register?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login;
