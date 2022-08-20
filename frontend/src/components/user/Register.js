import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData.js';
import { login, register, clearErrors } from '../../actions/userActions.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const nagivate = useNavigate();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            nagivate('/');
        }

        if (error) {
            alert(error);
            return;
        }
    }, [dispatch, error, isAuthenticated, nagivate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { name, email, password }
        dispatch(register(formData));
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            id="register_button"
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