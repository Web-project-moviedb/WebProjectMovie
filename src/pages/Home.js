// Homepage

//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { fetchMoviesByYear, fetchMoviesByLanguage, fetchMoviesByGenre, fetchGenres, fetchMoviesByTerm } from '../api/tmdbFetches';
import MovieList from '../components/movies/movieList.js';



function Home() {

const [term, setTerm] = useState('')  // State to store the search term
const [year, setYear] = useState('')  // State to store the input year
const [language, setLanguage] = useState('')  // State to store the input language
const [genre, setGenre] = useState('');  // State to store the selected genre ID
const [genres, setGenres] = useState([]);  // State to store the fetched genres
const [movies, setMovies] = useState([])  // State to store the list of movies
const [error, setError] = useState(null)  // State to store error message (if any)
const [loading, setLoading] = useState(false)  // State to handle loading state

useEffect(() => {
    // Fetch genres when the component mounts
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();  // Fetch genres from the API
        setGenres(data.genres || []);  // Set the fetched genres to state, square brackets in case of no genres
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('Failed to load genres. Please try again.');
      }
    };

    loadGenres();
  }, []);  // Empty dependency array ensures this only runs once on mount


const handleSearchByTerm = async (event) => {
    event.preventDefault()  // Prevent form submission from refreshing the page
    setLoading(true)
    setError(null)  // Reset any previous error

    try {
        const data = await fetchMoviesByTerm(term)  // Fetch movies for the specified year
        if (data.results) {
            setMovies(data.results)  // Set the fetched movies to state
        } else {
            setError('No movies found for this year.')  // Handle case with no results
        }
    } catch (error) {
        setError('Error fetching movies. Please try again.')  // Handle fetch error
    } finally {
        setLoading(false)
        setYear('');  // Clear year field
        setLanguage('');  // Clear language field
        setGenre('');  // Clear genre selection
    }

}

const handleSearchByYear = async (event) => {
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
        setTerm('');  // Clear term field
        setLanguage('');  // Clear language field
        setGenre('');  // Clear genre selection
    }
}

const handleSearchByLanguage = async (event) => {
    event.preventDefault()  // Prevent form submission from refreshing the page
    setLoading(true)
    setError(null)  // Reset any previous error

    try {
        const data = await fetchMoviesByLanguage(language)  // Fetch movies for the specified language
        if (data.results) {
            setMovies(data.results)  // Set the fetched movies to state
        } else {
            setError('No movies found for this language.')  // Handle case with no results
        }
    } catch (error) {
        setError('Error fetching movies. Please try again.')  // Handle fetch error
    } finally {
        setLoading(false)
        setTerm('');  // Clear term field
        setYear('');  // Clear year field
        setGenre('');  // Clear genre selection
    }
}

const handleSearchByGenre = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMoviesByGenre(genre);
      if (data.results) {
        setMovies(data.results);
      } else {
        setError('No movies found for this genre.');
      }
    } catch (error) {
      setError('Error fetching movies. Please try again.');
    } finally {
      setLoading(false);
      setTerm('');  // Clear term field
      setYear('');  // Clear year field
      setLanguage('');  // Clear language field
    }
  };

return (
    <div>
        <h1>Home</h1>

        <h3>Search for movies</h3>

        <form onSubmit={handleSearchByTerm}>
            <label>
                Enter search term:
                <input
                    type="string"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g. Apocalypse Now"
                />
            </label>
            <button type="submit">Search</button>
        </form>

        <form onSubmit={handleSearchByYear}>
            <label>
                Enter year:
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2021"
                />
            </label>
            <button type="submit">Search</button>
        </form>

        <form onSubmit={handleSearchByLanguage}>
            <label>
                Enter language code:
                <input
                    type="string"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g. 'sv' for Swedish"
                />
            </label>
            <button type="submit">Search</button>
        </form>

        <form onSubmit={handleSearchByGenre}>
        <label>
          Select genre:
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
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