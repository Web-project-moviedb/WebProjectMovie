// components/movies/SearchForm.js
import React from 'react';

function SearchForm({ label, placeholder, value, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <label>
                {label}:
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </label>
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;