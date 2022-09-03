import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

// The Profile component that displays the user's profile.
const Profile = () => {
    const { loading, user } = useSelector(state => state.user);

    // If the page is loading, show the Loader; otherwise, show the profile page.
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="My Profile" />
                    <div className="row mt-5 justify-content-center user-info">
                        <div className="col-12 col-md-3 me-5">
                            <div className='d-flex justify-content-center align-items-center'>
                                <figure className='avatar avatar-profile'>
                                    <img className="rounded-circle img-fluid" src={user.avatar.url} alt='user avatar' />
                                </figure>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Link to='/me/update' id="edit-profile" className="btn btn-dark my-5">
                                    Edit profile
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-0">
                            <div>
                                <h4>Name</h4>
                                <p>{user.name}</p>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                                <h4>Account created at</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                                <div className='d-flex text-nowrap justify-content-start'>
                                    <button className="btn me-3 block" id='primary-button'>
                                        <Link to='/orders/me' style={{ textDecoration: 'none', color: 'black' }}> My orders </Link>
                                    </button>
                                    <button className="btn btn-danger">
                                        <Link to='/password/update' style={{ textDecoration: 'none', color: 'white' }}>
                                            Change password
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Profile;