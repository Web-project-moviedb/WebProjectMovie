import React, { useState } from 'react';
import { UseUser } from '../../context/UseUser.js' // Import your custom hook
import axios from 'axios';

export default function LeaveReview({ movieId }) {
    const { user, token } = UseUser(); // Access the user and token from context
    const [review, setReview] = useState({ stars: 0, review_title: '', review_body: '' }); // Review state
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const url = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the request payload
        const reviewData = {
            movie_id: movieId,
            user_id: user.id, // Use the user ID from context
            stars: review.stars,
            review_title: review.review_title,
            review_body: review.review_body,
        };

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Use the token for authentication
            };

            // Post the review
            await axios.post(url + '/reviews', reviewData, { headers });
            setSuccess(true); // Show success message
            setReview({ stars: 0, review_title: '', review_body: '' }); // Reset form
        } catch (err) {
            setError('Failed to submit the review. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Leave a Review</h2>
            {success && <p>Review submitted successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.stars}
                        onChange={(e) => setReview({ ...review, stars: parseInt(e.target.value, 10) })}
                        required
                    />
                </div>

                <div>
                    <label>Review Title:</label>
                    <textarea
                        value={review.review_title}
                        onChange={(e) => setReview({ ...review, review_title: e.target.value })}
                        required
                    ></textarea>
                </div>


                <div>
                    <label>Review:</label>
                    <textarea
                        value={review.review_body}
                        onChange={(e) => setReview({ ...review, review_body: e.target.value })}
                        required
                    ></textarea>
                </div>
                {!user.id && <p>You must be logged in to leave a review.</p>}
                <button type="submit" disabled={!user.id}>
                    Submit
                </button>

            </form>
        </div>
    );
}