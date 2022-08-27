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
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <h2 className="mt-5 ml-5">My Profile</h2>
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt='user avatar' />
                            </figure>
                            <Link to='/me/update' id="edit-profile" className="btn btn-primary my-5">
                                Edit profile
                            </Link>
                        </div>
                        <div className="col-12 col-md-5">
                            <h4>Name</h4>
                            <p>{user.name}</p>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                            <h4>Account created at</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            <Link to='/orders/me' href="#" className="btn btn-success btn-block mt-3 me-3">
                                My orders
                            </Link>
                            <Link to='' href="/password/update" className="btn btn-primary btn-block mt-3">
                                Change my password
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile;