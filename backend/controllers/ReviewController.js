import { ApiError } from '../helpers/ApiError.js'
import { selectAllReviews, selectAllReviewsByUser, insertReview, deleteReview } from '../models/Review.js'

const getAllReviews = async (req, res, next) => {
    try {
        const response = await selectAllReviews()
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const getAllReviewsByUser = async (req, res, next) => {
    try {
        const response = await selectAllReviewsByUser(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const postReview = async (req, res, next) => {
    try {
        const response = await insertReview(req.body.user_id, req.body.movie_id, req.body.review_title, req.body.review_body, req.body.stars)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const removeReview = async (req, res, next) => {
    try {
        const response = await deleteReview(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}


export { getAllReviews, getAllReviewsByUser, postReview, removeReview }