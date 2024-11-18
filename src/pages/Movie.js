import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieById } from '../api/fetchTMDB.js'
import MovieDetails from '../components/movies/MovieDetails.js'

function Movie() {
    const { id } = useParams()  // movie ID from URL
    const [movie, setMovie] = useState(null)  // state to store movie data
    const [loading, setLoading] = useState(true)  // state to manage loading state
    const [error, setError] = useState(null)  // state to handle errors

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await fetchMovieById(id)  // fetch movie data
                if (data.success === false) {
                    throw new Error(data.status_message || 'An unknown error occurred');
                }
                setMovie(data)  // set the movie data in state
            } catch (error) {
                setError(error.message)
                console.error('Error fetching movie:', error)
            } finally {
                setLoading(false)
            }
        };
        getMovie()  // call function to fetch movie data
    }, [id])

    if (loading) {
        return <h3>Loading...</h3>  // message while fetching
    }

    if (error) {
        return <h3>Error: {error}</h3>
    }

    return (
        <div>
            {movie && <MovieDetails movie={movie} />}  {/* pass movie data to MovieDetails */}
        </div>
    )
}

export default Movie