import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { forgotPassword } from '../../actions/userActions.js';
import { clearForgotPasswordErrors, clearForgotPasswordMessage } from '../../reducers/userForgotPasswordSlice.js';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (message) {
            alert(message);
            dispatch(clearForgotPasswordMessage());
        }

        if (error) {
            alert(error);
            dispatch(clearForgotPasswordErrors());
        }
    }, [dispatch, error, message, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { email }
        dispatch(forgotPassword(formData));
    }

    return (
        <>
            <MetaData title="Forgot Password" />
            <div className="row wrapper">
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="text-center mt-2 mb-5">Forgot Password</h2>
                        <div className="form-group">
                            <label htmlFor="email-field">Email</label>
                            <input
                                type="text"
                                id="email-field"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn mt-4 mb-3" id='primary-button' disabled={loading ? true : false} >
                                Send Me A Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword