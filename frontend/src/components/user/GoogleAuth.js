import React, { useEffect } from 'react';
import jwtDecoder from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/userActions.js';

// Google Authentication component.
const GoogleAuth = () => {
    const dispatch = useDispatch();

    function handleCredentialResponse(response) {
        const userInfo = jwtDecoder(response.credential);
        const name = userInfo.name;
        const email = userInfo.email;
        // Create a password based on the user's google Id. This is temporary. 
        const password = userInfo.sub;
        dispatch(register({ name, email, password }));
    }

    // Renders the sign-in button with JavaScript, and returns the JWT to JavaScript 
    // callback handler.
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "large" }
        );
    }, []);

    return (
        <div id='buttonDiv' className='d-flex mt-3 justify-content-center' style={{ width: '100%' }}></div>
    )
}

export default GoogleAuth