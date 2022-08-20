import React, { Fragment } from 'react';

const Loader = () => {
    return (
        // <div className='loader'>Loading...</div>
        <div className="d-flex justify-content-center" id='loader-spinner'>
            <div className="spinner-border" style={{ width: '3em', height: '3em' }} role="status" >
                <span className="sr-only">Loading...</span>
            </div >
        </div>
    )
}

export default Loader;

// {{ textDecoration: 'none' }}