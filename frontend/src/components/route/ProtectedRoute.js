import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions/userActions';

// The protected route component that protects certain routes('/me' & '/me/update') 
// from being accessed by unauthorized users.
const ProtectedRoute = ({ children }) => {
    const {
        isAuthenticated = false,
        loading = true,
        user,
    } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [isAuthenticated, loading, dispatch, user]);

    if (loading) {
        return <h1>Loading the page...</h1>;
    }

    if (!loading && isAuthenticated) {
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default ProtectedRoute;