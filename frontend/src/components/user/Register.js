import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { register } from '../../actions/userActions.js';
import { clearUserAuthenticationErrors } from '../../reducers/userAuthenticationSlice.js';

// The Register component that handles the registration process.
const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const { firstName, lastName, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default-avatar.svg');

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

        const name = `${firstName} ${lastName}`;

        const formData = { name, email, password, avatar };
        dispatch(register(formData));
    }

    // Handles the input change event.
    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    return (
        <>
            <div className="row wrapper">
                <MetaData title="Register" />
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="mb-3 text-center">Register</h2>
                        <div className="form-group">
                            <label htmlFor="name-field">First Name</label>
                            <input
                                type="name"
                                id="name-field1"
                                className="form-control"
                                name='firstName'
                                value={firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="name-field">Last Name</label>
                            <input
                                type="name"
                                id="name-field2"

                                className="form-control"
                                name='lastName'
                                value={lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
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
                        <div className="form-group mt-3">
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
                        <div className='form-group mt-3'>
                            <label htmlFor='avatar-field'>Avatar</label>
                            <div className='d-flex align-items-center' id='avatar-field'>
                                <div className='me-5'>
                                    <figure className='avatar'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='input-group me-0'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='form-control'
                                        id='inputGroupFile'
                                        onChange={handleChange}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button
                                id="register-btn"
                                type="submit"
                                className="btn"
                                disabled={loading ? true : false}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;