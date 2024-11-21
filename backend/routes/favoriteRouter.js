import { Router } from 'express'
import { getAllFavoritesByUser, postFavorite, removeFavorite, getAllUsersToFavorite } from '../controllers/FavoriteController.js'

const router = Router()

router.post('/', postFavorite)
router.get('/:id', getAllFavoritesByUser)
router.get('/', getAllUsersToFavorite)
router.delete('/:id', removeFavorite)


export default router