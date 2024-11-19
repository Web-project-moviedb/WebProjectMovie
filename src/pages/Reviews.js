import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchMovieById } from '../api/fetchTMDB' // Import fetchMovieById function
import AllReviews from '../components/reviews/AllReviews.js'

function Reviews() {
    const [reviews, setReviews] = useState([])
    const [movies, setMovies] = useState({})  // Store movie details by movie_id
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const url = process.env.REACT_APP_API_URL

    useEffect(() => {
        axios.get( url + '/reviews')
            .then(response => {
                setReviews(response.data)
                fetchMovieNames(response.data)
            })
            .catch(error => {
                setError("Error fetching reviews: " + error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [url])

    const fetchMovieNames = async (reviews) => {

        const moviesData = {}

        for (const review of reviews) {
            if (!moviesData[review.movie_id]) {
                try {
                    const movieData = await fetchMovieById(review.movie_id)  // get movie data by movie_id
                    moviesData[review.movie_id] = movieData.title  // store movie name
                } catch (error) {
                    console.error(`Error fetching movie title ${review.movie_id}:`, error)
                }
            }
        }
        setMovies(moviesData)
    }

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div>
            <h1>All Reviews</h1>
            {/* Pass the reviews and movies to the ReviewList component */}
            <AllReviews reviews={reviews} movies={movies} />
        </div>
    )
}

export default Reviews