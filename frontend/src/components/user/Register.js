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
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/default-avatar.jpg');

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
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
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

                        <div className='form-group'>
                            <label htmlFor='avatar'>Avatar</label>
                            <div className='d-flex align-items-center' id='avatar'>
                                <div className='me-5'>
                                    <figure className='avatar me-3'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='input-group ms-3'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='form-control'
                                        id='inputGroupFile'
                                        accept="iamges/*"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor='inputGroupFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
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