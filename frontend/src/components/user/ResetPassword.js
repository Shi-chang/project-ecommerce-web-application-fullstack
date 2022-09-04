import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { resetPassword } from '../../actions/userActions.js';
import { clearResetPasswordErrors, clearResetPasswordMessage } from '../../reducers/userResetPasswordSlice.js';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.resetPassword);

    // Once the reset process is complete, navigate to the login page.
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearResetPasswordErrors());
        }

        if (message) {
            alert(message);
            dispatch(clearResetPasswordMessage());
            navigate('/login');
        }

    }, [dispatch, error, navigate, message]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            alert("Oops. New passwords do not match!");
            return;
        }

        const formData = { password }
        dispatch(resetPassword(params.token, formData));
    }

    return (
        <>
            <MetaData title="Reset Password" />
            <div className="row wrapper">
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="text-center mt-2 mb-5">Reset Password</h2>

                        <div className="form-group">
                            <label htmlFor="reset-password-field1">New Password</label>
                            <input
                                type="password"
                                id="reset-password-field1"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reset-password-field2">Confirm New Password</label>
                            <input
                                type="password"
                                id="reset-password-field2"
                                className="form-control"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
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

export default NewPassword;