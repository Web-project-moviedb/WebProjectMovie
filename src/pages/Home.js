// Homepage

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { fetchMoviesByYear } from '../api/tmdbFetches';
import MovieList from '../components/movieList.js';


function Home() {

const [year, setYear] = useState('')  // State to store the input year
const [movies, setMovies] = useState([])  // State to store the list of movies
const [error, setError] = useState(null)  // State to store error message (if any)
const [loading, setLoading] = useState(false)  // State to handle loading state

const handleSearch = async (event) => {
    event.preventDefault()  // Prevent form submission from refreshing the page
    setLoading(true)
    setError(null)  // Reset any previous error

    try {
        const data = await fetchMoviesByYear(year)  // Fetch movies for the specified year
        if (data.results) {
            setMovies(data.results)  // Set the fetched movies to state
        } else {
            setError('No movies found for this year.')  // Handle case with no results
        }
    } catch (error) {
        setError('Error fetching movies. Please try again.')  // Handle fetch error
    } finally {
        setLoading(false)
    }
}

return (
    <div>
        <h3>Home</h3>
        <form onSubmit={handleSearch}>
            <label>
                Enter year:
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., 2021"
                />
            </label>
            <button type="submit">Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* Pass the movies list to MovieList component */}
        <MovieList movies={movies} />
    </div>
)
}

export default Home