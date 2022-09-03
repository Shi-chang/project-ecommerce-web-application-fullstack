import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from './Search.js';
import { logout } from '../../actions/userActions.js';

// The header component.
const Header = () => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const { loading, user } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    // Handles the logout event.
    const handleLogout = () => {
        dispatch(logout());
        alert("You have logged out successfully.");
    }

    // Handles navigation to the cart page event.
    const handleNavigateToCart = () => {
        // If the user state in the store is null, ask the user to login; 
        // otherwise navigate to the cart page.
        if (!user) {
            return alert("Please log in first.");
        }
        nagivate('/cart');
    }

    // Ensures that when the company logo is clicked, the input in the search field will
    // be cleared.
    const handleLogoClick = () => {
        const searchInput = document.getElementById('search-field');
        searchInput.value = "";
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="col-12 col-lg-3 me-auto my-2 text-center">
                            <Link to="/" className="d-inline-flex text-white" style={{ textDecoration: 'none' }} onClick={handleLogoClick}>
                                <div className='company-name'>All You Need</div>
                                <i className="far fa-registered"></i>
                                <div className='ms-2'>
                                    <i className="fa fa-shopping-cart fa-2x"></i>
                                </div>
                            </Link>
                        </div>

                        <div className="col-12 col-lg-6 me-auto my-2 justify-content-center">
                            <Search />
                        </div>

                        <div className="col-12 col-lg-3 me-auto my-2 d-flex justify-content-center">
                            {user ? (
                                <div className="me-5 pe-5 dropdown d-inline">
                                    <button className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                        <figure className="avatar avatar-nav">
                                            <img
                                                src={user.avatar && user.avatar.url}
                                                alt={user && user.name}
                                                className="rounded-circle"
                                            />
                                        </figure>
                                        <span>{user && user.name}</span>
                                    </button>

                                    <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                        <Link to="/orders/me" className="dropdown-item" >My Orders</Link>
                                        <Link to="/me" className="dropdown-item" >My Profile</Link>
                                        <Link to="/" className="dropdown-item text-danger" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </div>
                                </div>

                            ) : !loading && <Link to="/login" className="btn me-5" id="login-btn">Login</Link>}

                            <div className='col-6' style={{ textDecoration: 'none' }} id="cart-field" onClick={() => handleNavigateToCart()}>
                                <i className="bi bi-cart4 text-white me-2"><svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg></i>
                                <span className="cart-count" id="cart-count">{cartItems.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;