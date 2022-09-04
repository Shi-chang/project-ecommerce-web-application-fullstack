import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { updatePassword } from '../../actions/userActions.js';
import { clearUserUpdateErrors, resetUpdatePassword } from '../../reducers/userUpdateSlice.js';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isUpdated, error } = useSelector(state => state.userUpdate);

    // Once the update process is complete, navigate to the /me home page.
    useEffect(() => {
        if (isUpdated) {
            alert("Password successfully updated.");
            navigate('/me');
            dispatch(resetUpdatePassword());
        }
        if (error) {
            alert(error);
            dispatch(clearUserUpdateErrors());
        }
    }, [dispatch, error, navigate, isUpdated]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmedNewPassword) {
            alert("Oops. New passwords do not match!");
            return;
        }

        const formData = { oldPassword, newPassword }
        dispatch(updatePassword(formData));
    }

    return (
        <>
            <MetaData title="Update Password" />
            <div className="row wrapper">
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="text-center mt-2 mb-5">Update Password</h2>
                        <div className="form-group">
                            <label htmlFor="old-password-field">Old Password</label>
                            <input
                                type="password"
                                id="old-password-field"
                                className="form-control mb-3"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new-password-field1">New Password</label>
                            <input
                                type="password"
                                id="new-password-field1"
                                className="form-control mb-3"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new-password-field2">Confirm New Password</label>
                            <input
                                type="password"
                                id="new-password-field2"
                                className="form-control"
                                value={confirmedNewPassword}
                                onChange={(e) => setConfirmedNewPassword(e.target.value)}
                            />
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn mt-4 mb-3" id='primary-button' disabled={loading ? true : false} >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword;