import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The search component in the header.
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();

        // If the keyword is not empty, do the search; otherwise, go to the home page.
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search-field"
                        className="form-control"
                        placeholder="Hi, what do you need?"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button id="search-btn" className="btn"> Search </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Search;