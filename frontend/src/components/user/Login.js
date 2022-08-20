import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader.js';
import MetaData from '../layout/MetaData.js';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../../actions/userActions.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, isAuthenticated, error } = useSelector(state => state.user);

    //
    useEffect(() => {
        if (isAuthenticated) {
            nagivate('/');
        }

        if (error) {
            // alert(error);
            return;
        }
    }, [dispatch, error, isAuthenticated, nagivate]);

    const handleSumbit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <div>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Log in'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={handleSumbit}>
                                <h1 className="mb-3">Login</h1>
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
                                <div className="d-flex justify-content-end">
                                    <Link to="/password/forgot" className="float-right mt-3">Forgot Password?</Link>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Link to="/register" className="float-right my-3">Register?</Link>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button
                                        id="login-btn"
                                        type="submit"
                                        className="mt-3"
                                    >
                                        Login
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>


                </>
            )}
        </div>
    )
}

export default Login