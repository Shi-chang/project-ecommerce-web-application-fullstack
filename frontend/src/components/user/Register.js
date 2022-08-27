import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { register } from '../../actions/userActions.js';
import { clearUserAuthenticationErrors } from '../../reducers/userAuthenticationSlice.js';

// The Register component that handles the registration process.
const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isAuthenticated, error } = useSelector(state => state.user);

    // Once the registration process is complete and the user is authenticated, navigate to the
    // home page.
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            alert(error);
            dispatch(clearUserAuthenticationErrors());
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    // Handles the submit event.
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { name, email, password }
        dispatch(register(formData));
    }

    // Handles the input change event.
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="row wrapper">
                <MetaData title="Register" />
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>
                        <div className="form-group">
                            <label htmlFor="name-field">Name</label>
                            <input
                                type="name"
                                id="name-field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-field">Email</label>
                            <input
                                type="email"
                                id="email-field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-field">Password</label>
                            <input
                                type="password"
                                id="password-field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            id="register-button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;