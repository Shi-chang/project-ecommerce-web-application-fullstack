import React from 'react';

// The loader component that shows the loading message while the page is still loading.
const Loader = () => {
    return (
        <div className="d-flex justify-content-center" id='loader-spinner'>
            <div className="spinner-border" style={{ width: '3em', height: '3em' }} role="status" >
                <span className="sr-only">Loading...</span>
            </div >
        </div>
    )
}

export default Loader;