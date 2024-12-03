import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { renderStars, formatTimestamp } from '../../utils/helperFunctions.js'

function ReviewList({ reviews, movies }) {
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' }) // sort by created_at in descending order by default

    const sortedReviews = [...reviews].sort((a, b) => {
        let aValue, bValue

        if (sortConfig.key === 'movie_title') {
            // Get the movie title for sorting
            aValue = movies[a.movie_id] || ''
            bValue = movies[b.movie_id] || ''
        } else {
            // Default sorting based on review fields
            aValue = a[sortConfig.key]
            bValue = b[sortConfig.key]
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    const requestSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    return (
        <div>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('movie_title')}>Movie Title</th>
                            <th onClick={() => requestSort('stars')}>Stars</th>
                            <th onClick={() => requestSort('uname')}>Reviewer</th>
                            <th>Title</th>
                            <th>Review</th>
                            <th onClick={() => requestSort('created_at')}>Time Reviewed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReviews.map((review) => (
                            <tr key={review.id}>
                                <td>
                                    {movies[review.movie_id] ? (
                                        <Link to={`/movie/${review.movie_id}`}>
                                            {movies[review.movie_id] || 'Unable to Fetch Title'}
                                        </Link>
                                    ) : (
                                        <span>Loading movie name...</span>
                                    )}
                                </td>
                                <td>{renderStars(review.stars)}</td>
                                <td><Link to={`/account/${review.account_id}`}>{review.uname}</Link></td>
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

export default ReviewList