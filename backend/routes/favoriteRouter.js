import { Router } from 'express'
import { getAllFavoritesByUser, postFavorite, removeFavorite } from '../controllers/FavoriteController.js'

const router = Router()

router.post('/', postFavorite)
router.get('/:id', getAllFavoritesByUser)
router.delete('/:id', removeFavorite)


export default router