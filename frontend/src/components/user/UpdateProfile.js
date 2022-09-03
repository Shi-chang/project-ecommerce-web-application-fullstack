import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { loadUser, updateProfile } from '../../actions/userActions.js';
import { clearUserUpdateErrors, resetUpdateProfile } from '../../reducers/userUpdateSlice.js';

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { loading, isUpdated, error } = useSelector(state => state.userUpdate);

    // Once the update process is complete, navigate to the /me home page.
    useEffect(() => {
        if (user) {
            setFirstName(user.name.split(' ')[0]);
            setLastName(user.name.split(' ')[1]);
            setEmail(user.email);
        }
        if (isUpdated) {
            alert("Profile successfully updated.");
            dispatch(loadUser());
            navigate('/me');
            dispatch(resetUpdateProfile());
        }
        if (error) {
            alert(error);
            dispatch(clearUserUpdateErrors());
        }
    }, [dispatch, error, navigate, isUpdated, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let name = `${firstName} ${lastName}`;
        const formData = { name, email }
        dispatch(updateProfile(formData));
    }

    return (
        <>
            <MetaData title="Update Profile" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h2 className="mt-2 mb-5 text-center">Update Profile</h2>
                        <div className="form-group">
                            <label htmlFor="name-field1">First Name</label>
                            <input
                                type="text"
                                id="name-field1"
                                className="form-control mb-3"
                                name='firstName'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name-field2">Last Name</label>
                            <input
                                type="text"
                                id="name-field2"
                                className="form-control mb-3"
                                name='lastName'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button
                                type="submit"
                                className="btn"
                                id='primary-button'
                                disabled={loading ? true : false} >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile;