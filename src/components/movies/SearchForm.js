import React from 'react';

// this component displays a search form, which consists of a label, input field, and submit button
// it will be used to search for movies by term, year, language, and genre
// it is populated with props passed in from the parent component

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