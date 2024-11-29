import React, {useEffect, useState} from 'react'
import { renderStars } from '../../utils/helperFunctions.js'

function ReviewByMovie ({reviews}) {

    const [sortedReviews, setSortedReviews] = useState([])

    useEffect(() => {
        const sorted = [...reviews].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA; // Compare dates: newest first
        });
        setSortedReviews(sorted);
    }, [reviews])   // run effect when reviews change

    return (
        <div>
            <h3>Reviews by Our Members</h3>

            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Stars</th>
                            <th>Reviewer</th>
                            <th>Title</th>
                            <th>Review</th>
                            {/* <th>Time Reviewed</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {sortedReviews.map((review) => (
                            <tr key={review.id}>
                                <td>{renderStars(review.stars)}</td>
                                <td>{review.uname}</td>
                                <td>{review.review_title}</td>
                                <td>{review.review_body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) 
            }

        </div>
    )
}

export default ReviewByMovie