// pages/Home.js
import React, { useState } from 'react'
import { fetchMoviesByYear, fetchMoviesByLanguage, fetchMoviesByGenre, fetchMoviesByTerm } from '../api/fetchTMDB'
import MovieList from '../components/movies/MovieList.js'
import SearchForm from '../components/movies/SearchForm.js'
import GenreSelect from '../components/movies/GenreSelect.js'
import './Home.css'

function Home() {
    const [term, setTerm] = useState('')
    const [year, setYear] = useState('')
    const [language, setLanguage] = useState('')
    const [genre, setGenre] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSearch = async (fetchFunction, params = {}) => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchFunction(params)
            if (data.results) {
                setMovies(data.results)
            } else {
                setError('No movies found.')
            }
        } catch (error) {
            setError('Error fetching movies. Please try again.')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="home-page">
            <h1>Movie Finder</h1>
            <h3>Search for movies:</h3>

            {/* Search form in table format */}
            <table className="search-table">
                <tbody>
                    <tr>
                        <td><label>Name:</label></td>
                        <td><input
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="e.g. Apocalypse Now"
                        /></td>
                        <td><button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSearch(fetchMoviesByTerm, term)
                                setTerm('')
                            }}
                        >Search</button></td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Or browse by:</h3>

            <table className="browse-table">
                <tbody>
                    <tr>
                        <td><label>Year:</label></td>
                        <td><input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="e.g. 2021"
                        /></td>
                        <td><button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSearch(fetchMoviesByYear, year)
                                setYear('')
                            }}
                        >Search</button></td>
                    </tr>
                    <tr>
                        <td><label>Language code:</label></td>
                        <td><input
                            type="text"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            placeholder="e.g. 'sv' for Swedish"
                        /></td>
                        <td><button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSearch(fetchMoviesByLanguage, language)
                                setLanguage('')
                            }}
                        >Search</button></td>
                    </tr>
                    <tr>
                        <td><label>Genre:</label></td>
                        <td><GenreSelect
                            selectedGenre={genre}
                            onGenreChange={setGenre}
                        /></td>
                        <td><button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSearch(fetchMoviesByGenre, genre)
                                setGenre('')
                            }}
                        >Search</button></td>
                    </tr>
                </tbody>
            </table>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MovieList movies={movies} />
        </div>
    )
}

export default Home