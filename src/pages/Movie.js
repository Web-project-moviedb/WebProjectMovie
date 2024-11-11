import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieById } from '../api/tmdbFetches.js'

function Movie() {

    const { id } = useParams()  // Get the movie ID from the URL
    const [movie, setMovie] = useState(null)  // State to store the movie data
    const [loading, setLoading] = useState(true)  // State to manage loading state
    const [error, setError] = useState(null)  // State to handle errors

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await fetchMovieById(id)  // Fetch the movie data

                if (data.success === false) {  // Check if the response indicates an error
                    throw new Error(data.status_message || 'An unknown error occurred')  // Throw an error with the message from the response
                }

                setMovie(data)  // Set the movie data in state
            } catch (error) {
                setError(error.message)  // Store the error message in the state
                console.error('Error fetching movie:', error)
            } finally {
                setLoading(false)  // Stop loading once data is fetched or an error occurs
            }
        }

        getMovie()  // Call the function to fetch the movie data
    }, [id])  // Re-run the effect when the `id` changes

    if (loading) {
        return <h3>Loading...</h3>  // Show a loading message while the movie data is being fetched
    }

    if (error) {
        return <h3>Error: {error}</h3>  // Display the error message if there was an issue fetching the movie
    }

    return (
        <div>
            <h3>{movie.title}</h3>  {/* Display movie title */}
            <p><i>{movie.tagline}</i></p>
            <p>{movie.overview}</p>  {/* Display movie overview */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />  {/* Display movie poster */}
            <p>Release date: {movie.release_date}</p>  {/* Display movie release date */}
            <p>Runtime: {movie.runtime} minutes</p>
            <p>Genres: </p>
            <ul>
                {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Movie