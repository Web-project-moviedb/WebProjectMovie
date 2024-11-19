// pages/Home.js
import React, { useState } from 'react'
import { fetchMoviesByYear, fetchMoviesByLanguage, fetchMoviesByGenre, fetchMoviesByTerm } from '../api/fetchTMDB'
import MovieList from '../components/movies/MovieList.js'
import SearchForm from '../components/movies/SearchForm.js'
import GenreSelect from '../components/movies/GenreSelect.js'

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
        <div>
            <h1>Home</h1>
            <h3>Search for movies:</h3>

            {/*SearchForm components for searching by term/year/language/genre, props are passed along with event handlers */}

            <SearchForm                          
                label="Name"
                placeholder="e.g. Apocalypse Now"
                value={term}
                onChange={setTerm}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(fetchMoviesByTerm, term)
                    setTerm('')
                }}
            />

            <h3>Or browse by:</h3>

            <SearchForm
                label="Year"
                placeholder="e.g. 2021"
                value={year}
                onChange={setYear}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(fetchMoviesByYear, year)
                    setYear('')
                }}
            />

            <SearchForm
                label="Language code"
                placeholder="e.g. 'sv' for Swedish"
                value={language}
                onChange={setLanguage}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(fetchMoviesByLanguage, language)
                    setLanguage('')
                }}
            />

            <GenreSelect
                selectedGenre={genre}
                onGenreChange={setGenre}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(fetchMoviesByGenre, genre)
                    setGenre('')
                }}
            />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MovieList movies={movies} />
        </div>
    )
}

export default Home