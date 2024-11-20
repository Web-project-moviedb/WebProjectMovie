// Use this component using the following code format: <ReviewsByUser id={123} />

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { fetchMovieNames, renderStars, formatTimestamp } from "../../utils/helperFunctions.js"

function ReviewsByUser({ id }) {
    const [reviews, setReviews] = useState([]) // State to store user reviews
    const [movies, setMovies] = useState({}) // State to store movie names
    const [loading, setLoading] = useState(true) // State to track loading
    const [error, setError] = useState(null) // State to store errors

    const url = process.env.REACT_APP_API_URL

    useEffect(() => {

        const fetchUserReviews = async () => {

            try {
                const response = await axios.get(`${url}/reviews/user/${id}`)
                const fetchedReviews = response.data
                setReviews(fetchedReviews)

                // Fetch movie names for the reviews
                const moviesData = await fetchMovieNames(fetchedReviews)
                setMovies(moviesData)

            } catch (error) {
                setError(`Error fetching reviews: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchUserReviews()

    }, [id, url]) // Run effect when id or url changes

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>{error}</h4>
    }

    return (
        <div>
            <h3>Reviews by User</h3>
            {reviews.length === 0 ? (
                <p>No reviews found for this user.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Rating</th>
                            <th>Title</th>
                            <th>Review</th>
                            <th>Time Reviewed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td><Link to={`/movie/${review.movie_id}`}>
                                    {movies[review.movie_id] || "Unable to Fetch Title"}</Link></td>
                                <td>{renderStars(review.stars)}</td>
                                <td>{review.review_title}</td>
                                <td>{review.review_body}</td>
                                <td>{formatTimestamp(review.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ReviewsByUser