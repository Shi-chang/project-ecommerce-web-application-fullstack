import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { loadUser, updateProfile } from '../../actions/userActions.js';
import { clearUserUpdateErrors, resetUpdateProfile } from '../../reducers/userUpdateSlice.js';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { loading, isUpdated, error } = useSelector(state => state.userUpdate);

    // Once the registration process is complete and the user is authenticated, navigate to the
    // home page.
    useEffect(() => {
        if (user) {
            setName(user.name);
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
        const formData = { name, email }
        dispatch(updateProfile(formData));
    }

    return (
        <>
            <MetaData title="Update Profile" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>
                        <div className="form-group">
                            <label htmlFor="name-field">Name</label>
                            <input
                                type="name"
                                id="name-field"
                                className="form-control mb-3"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                        <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile;