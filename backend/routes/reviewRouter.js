import { Router } from 'express'
import { getAllReviews, getAllReviewsByUser, postReview, removeReview } from '../controllers/ReviewController.js'

const router = Router()

router.post('/', postReview)
router.get('/', getAllReviews)
router.get('/:id', getAllReviewsByUser)
router.delete('/:id', removeReview)


export default router