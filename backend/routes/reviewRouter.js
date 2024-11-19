import { Router } from 'express'
import { getAllReviews, getAllReviewsByUser, getAllReviewsByMovie, postReview, removeReview } from '../controllers/ReviewController.js'

const router = Router()

router.post('/', postReview)
router.get('/', getAllReviews)
router.get('/user/:id', getAllReviewsByUser)
router.get('/movie/:id', getAllReviewsByMovie)
router.delete('/:id', removeReview)


export default router