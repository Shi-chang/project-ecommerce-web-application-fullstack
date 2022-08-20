import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from './Search.js';
import { logout } from '../../actions/userActions.js';

// Header component
const Header = () => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const { loading, user } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    // Handle the logout event
    const handleLogout = () => {
        dispatch(logout());
        alert("You have logged out successfully.");
    }

    // Handle navigation to the cart page event
    const handleNavigateToCart = () => {
        // If the user state in the store is null, ask the user to login; 
        // otherwise navigate to the cart page.
        if (!user) {
            return alert("Please log in first.");
        }
        nagivate('/cart');
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="col-12 col-lg-3 me-auto my-2 mb-lg-0 text-center">
                            <Link to="/" className="d-inline-flex text-white" style={{ textDecoration: 'none' }}>
                                <div className='company-name'>All You Need</div>
                                <span className='bi bi-badge-tm'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-badge-tm mb-4" viewBox="0 0 16 16">
                                    <path d="M5.295 11V5.995H7V5H2.403v.994h1.701V11h1.19zm3.397 0V7.01h.058l1.428 3.239h.773l1.42-3.24h.057V11H13.5V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H7.634V11h1.06z" />
                                    <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                                </svg></span>
                                <span className='company-logo ms-3'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg></span>
                            </Link>
                        </div>

                        <div className="col-12 col-lg-6 me-auto my-2 mb-lg-0 justify-content-center">
                            <Search />
                        </div>

                        <div className="col-12 col-lg-3 me-auto my-2 mb-lg-0 d-flex justify-content-center">
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
                                        <Link className="dropdown-item" to="/orders/me">My Orders</Link>
                                        <Link className="dropdown-item" to="/me">My Profile</Link>
                                        <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </div>
                                </div>

                            ) : !loading && <Link to="/login" className="btn me-5" id="login-btn">Login</Link>}

                            <div className='col-6' style={{ textDecoration: 'none' }} id="cart-field" onClick={() => handleNavigateToCart()}>
                                <span id="cart" className="ml-3"> <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg> </span>
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