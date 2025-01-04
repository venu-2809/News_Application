import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/news/search?query=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for news:', error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for news..."
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;